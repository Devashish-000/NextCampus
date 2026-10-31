import React, { useState, useRef, useEffect } from 'react';
import { FiMessageSquare, FiSend, FiX, FiUser, FiExternalLink, FiRefreshCw, FiChevronDown } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { counselorService } from '../../../services/counselorService';
import { useAuth } from '../../../context/AuthContext';

const QUICK_PROMPTS = [
  "🎯 Safe NITs for 96% in JEE",
  "📋 JoSAA Freeze vs Float vs Slide",
  "⚖️ Compare IIT Bombay vs IIT Delhi",
  "💰 Fee waivers for SC/ST/OBC",
];

export const AICounselorWidget = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I am **NextCampus AI Mentor** 🎓, your 24/7 college admissions & cutoff counselor.\n\nAsk me anything about **JoSAA cutoffs, IIT/NIT comparisons, placements, or fee waivers**!`,
      suggestedColleges: [],
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const history = messages.slice(-6).map((m) => ({ role: m.role, content: m.content }));
      const userProfile = {
        fullName: user?.fullName,
        targetExam: user?.targetExam,
        entranceScore: user?.entranceScore,
        category: user?.category,
        state: user?.state,
        targetStream: user?.targetStream,
      };

      const res = await counselorService.sendMessage({
        message: text,
        history,
        userProfile,
      });

      const aiMsg = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: res.reply || 'I am processing your query. Please rephrase or try again.',
        suggestedColleges: res.suggestedColleges || [],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: 'assistant',
          content: 'Sorry, I encountered a network issue. Please ask again in a moment.',
          suggestedColleges: [],
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: `Conversation restarted! What college, exam, or counseling question can I help you with today?`,
        suggestedColleges: [],
        timestamp: new Date(),
      },
    ]);
  };

  // Helper to format basic markdown (bold, lists, headers)
  const renderFormattedContent = (content) => {
    return content.split('\n').map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="font-black text-sm text-indigo-950 mt-2 mb-1">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={idx} className="font-black text-xs text-indigo-900 mb-1">{line.replaceAll('**', '')}</p>;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const itemText = line.substring(2);
        return (
          <div key={idx} className="d-flex items-start gap-1.5 text-xs text-slate-700 my-0.5">
            <span className="text-indigo-600 font-bold">•</span>
            <span>{renderInlineBold(itemText)}</span>
          </div>
        );
      }
      if (/^\d+\.\s/.test(line)) {
        const match = line.match(/^(\d+\.)\s(.*)/);
        return (
          <div key={idx} className="d-flex items-start gap-1.5 text-xs text-slate-700 my-0.5">
            <span className="text-indigo-600 font-bold">{match[1]}</span>
            <span>{renderInlineBold(match[2])}</span>
          </div>
        );
      }
      if (!line.trim()) {
        return <div key={idx} className="h-1.5"></div>;
      }
      return <p key={idx} className="text-xs text-slate-700 mb-1 leading-relaxed">{renderInlineBold(line)}</p>;
    });
  };

  const renderInlineBold = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-extrabold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative d-inline-flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <HiSparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          <span className="text-xs font-black tracking-wide">AI Counselor 24/7</span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[550px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-900 text-white d-flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="d-flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-indigo-500/30 border border-indigo-400/40 d-flex items-center justify-center text-white">
                  <HiSparkles className="w-4 h-4 text-amber-300" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
              </div>
              <div>
                <h4 className="text-xs font-black text-white mb-0 leading-tight d-flex items-center gap-1.5">
                  NextCampus AI Mentor
                  <span className="badge bg-indigo-500/30 text-[9px] px-1.5 py-0.2 rounded text-indigo-200">2026</span>
                </h4>
                <p className="text-[10px] text-slate-300 mb-0 font-medium">Cutoffs & Counseling Specialist</p>
              </div>
            </div>
            
            <div className="d-flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Restart Chat"
                className="btn btn-sm btn-link text-slate-300 hover:text-white p-1 text-xs"
              >
                <FiRefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize"
                className="btn btn-sm btn-link text-slate-300 hover:text-white p-1 text-xs"
              >
                <FiChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Questions Carousel */}
          <div className="px-3 py-2 bg-indigo-50/70 border-b border-indigo-100/60 overflow-x-auto no-scrollbar d-flex gap-1.5 shrink-0">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="text-[11px] font-bold text-indigo-700 bg-white hover:bg-indigo-600 hover:text-white px-2.5 py-1 rounded-full whitespace-nowrap shadow-xs border border-indigo-200/80 transition-all shrink-0 active:scale-95"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-slate-50/50">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div
                  key={m.id}
                  className={`d-flex flex-column ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="d-flex items-center gap-1.5 mb-1 px-1">
                    {isUser ? (
                      <span className="text-[10px] font-bold text-slate-400">You</span>
                    ) : (
                      <span className="text-[10px] font-bold text-indigo-600 d-flex items-center gap-1">
                        <HiSparkles className="w-2.5 h-2.5" /> AI Mentor
                      </span>
                    )}
                  </div>

                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs shadow-xs ${
                      isUser
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-xs'
                        : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs'
                    }`}
                  >
                    {isUser ? (
                      <p className="mb-0 font-medium leading-relaxed">{m.content}</p>
                    ) : (
                      <div>{renderFormattedContent(m.content)}</div>
                    )}
                  </div>

                  {/* Suggested College Cards */}
                  {m.suggestedColleges && m.suggestedColleges.length > 0 && (
                    <div className="mt-2 space-y-1.5 w-[85%]">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0">Recommended Institutes:</p>
                      {m.suggestedColleges.map((col, idx) => (
                        <div
                          key={idx}
                          className="p-2 bg-white border border-indigo-100 rounded-xl shadow-xs d-flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-black text-slate-900 truncate mb-0">{col.name}</p>
                            <span className="text-[10px] text-slate-500 font-semibold">
                              NIRF #{col.nirfRank || 'N/A'} • Avg: {col.avgPackage || 'N/A'}
                            </span>
                          </div>
                          <Link
                            to={`/colleges/${col.id || ''}`}
                            onClick={() => setIsOpen(false)}
                            className="btn btn-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white font-bold px-2 py-1 rounded-lg text-[10px] d-flex items-center gap-1 shrink-0"
                          >
                            Explore <FiExternalLink className="w-2.5 h-2.5" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="d-flex items-center gap-2 text-slate-400 text-xs py-2 px-1">
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]"></div>
                <span className="text-[11px] font-semibold text-slate-500">AI Mentor analyzing cutoffs...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-100 d-flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              placeholder="Ask about cutoffs, fees, counseling..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="form-control text-xs py-2 px-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-medium"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="btn bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-3 py-2 text-xs font-bold shadow-md shadow-indigo-500/20 disabled:opacity-50 shrink-0"
            >
              <FiSend className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
