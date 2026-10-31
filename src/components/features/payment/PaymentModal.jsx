import React, { useState, useEffect } from 'react';
import { FiShield, FiCheckCircle, FiLock, FiX, FiPrinter, FiCreditCard, FiSmartphone, FiGlobe } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { leadService } from '../../../services/leadService';

export const PaymentModal = ({ isOpen, onClose, application, onPaymentSuccess }) => {
  const [activeTab, setActiveTab] = useState('upi'); // 'upi', 'card', 'netbanking'
  const [upiId, setUpiId] = useState('student@okaxis');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  useEffect(() => {
    if (application?.paymentStatus === 'paid') {
      setReceiptData({
        receiptNumber: `RCPT-2026-${application._id ? String(application._id).slice(-6).toUpperCase() : '849102'}`,
        transactionId: application.transactionId || `TXN_${Date.now()}`,
        amount: application.amountPaid || 750,
        date: application.paidAt ? new Date(application.paidAt).toISOString() : new Date().toISOString(),
        status: 'PAID',
        paymentMethod: 'UPI / Razorpay',
        gstin: '27AABCC1234D1Z5',
        hsnCode: '999293',
      });
    } else {
      setReceiptData(null);
    }
  }, [application]);

  if (!isOpen || !application) return null;

  const handlePay = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const paymentDetails = {
        amount: 750,
        paymentMethod: activeTab.toUpperCase(),
        collegeName: application.collegeName,
      };

      const result = await leadService.payApplicationFee(application._id, paymentDetails);

      if (result.success) {
        setReceiptData(result.receipt || {
          receiptNumber: `RCPT-2026-${Math.floor(100000 + Math.random() * 900000)}`,
          transactionId: result.data?.transactionId || `TXN_${Date.now()}`,
          amount: 750,
          date: new Date().toISOString(),
          status: 'PAID',
          paymentMethod: activeTab.toUpperCase(),
          gstin: '27AABCC1234D1Z5',
          hsnCode: '999293',
        });
        toast.success('Application Fee Paid Successfully!');
        if (onPaymentSuccess) {
          onPaymentSuccess(result.data, result.receipt);
        }
      } else {
        toast.error(result.message || 'Payment failed.');
      }
    } catch (err) {
      toast.error('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 font-sans">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white d-flex items-center justify-between border-b border-white/10">
          <div className="d-flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/30 d-flex items-center justify-center text-indigo-400">
              <FiShield className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white mb-0 leading-tight">NextCampus Gateway</h3>
              <p className="text-[10px] text-slate-400 mb-0 font-medium d-flex items-center gap-1">
                <FiLock className="w-2.5 h-2.5 text-emerald-400" /> 256-Bit SSL Encrypted Checkout
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="btn btn-sm btn-link text-slate-400 hover:text-white p-1"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!receiptData ? (
          <div className="p-5 space-y-4">
            
            {/* Order Summary Strip */}
            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl d-flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Institute Application</span>
                <h4 className="text-xs font-black text-slate-900 mb-0 truncate max-w-[220px]">{application.collegeName}</h4>
                <p className="text-[11px] text-slate-500 font-medium mb-0 truncate max-w-[220px]">{application.courseInterested}</p>
              </div>
              <div className="text-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Amount</span>
                <div className="text-lg font-black text-indigo-600">₹750<span className="text-xs font-semibold text-slate-400">.00</span></div>
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="d-flex gap-2 border-b border-slate-100 pb-2">
              <button
                type="button"
                onClick={() => setActiveTab('upi')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all d-flex items-center justify-center gap-1.5 border ${
                  activeTab === 'upi'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <FiSmartphone className="w-3.5 h-3.5" /> UPI / QR
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('card')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all d-flex items-center justify-center gap-1.5 border ${
                  activeTab === 'card'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <FiCreditCard className="w-3.5 h-3.5" /> Debit / Card
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('netbanking')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all d-flex items-center justify-center gap-1.5 border ${
                  activeTab === 'netbanking'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <FiGlobe className="w-3.5 h-3.5" /> NetBanking
              </button>
            </div>

            {/* Tab Specific Controls */}
            {activeTab === 'upi' && (
              <div className="space-y-3 p-3 bg-slate-50/50 rounded-2xl border border-slate-100">
                <div className="d-flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">UPI Virtual Payment Address</span>
                  <span className="badge bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-pill">Fastest</span>
                </div>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. yourname@oksbi"
                  className="form-control text-xs py-2 px-3 rounded-xl border border-slate-200 font-semibold"
                />
                <div className="d-flex items-center justify-center gap-3 pt-1 text-[11px] text-slate-500 font-semibold">
                  <span className="px-2 py-1 bg-white border border-slate-200 rounded-lg">GPay</span>
                  <span className="px-2 py-1 bg-white border border-slate-200 rounded-lg">PhonePe</span>
                  <span className="px-2 py-1 bg-white border border-slate-200 rounded-lg">Paytm</span>
                  <span className="px-2 py-1 bg-white border border-slate-200 rounded-lg">BHIM</span>
                </div>
              </div>
            )}

            {activeTab === 'card' && (
              <div className="space-y-2.5 p-3 bg-slate-50/50 rounded-2xl border border-slate-100">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Card Number</label>
                  <input
                    type="text"
                    defaultValue="4532 •••• •••• 8821"
                    className="form-control text-xs py-2 px-3 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Expiry</label>
                    <input
                      type="text"
                      defaultValue="08/29"
                      className="form-control text-xs py-2 px-3 rounded-xl border border-slate-200 font-semibold"
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">CVV</label>
                    <input
                      type="password"
                      defaultValue="982"
                      className="form-control text-xs py-2 px-3 rounded-xl border border-slate-200 font-semibold"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'netbanking' && (
              <div className="space-y-2 p-3 bg-slate-50/50 rounded-2xl border border-slate-100">
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Select Bank</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="form-select text-xs py-2 px-3 rounded-xl border border-slate-200 font-bold"
                >
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="State Bank of India">State Bank of India (SBI)</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="Axis Bank">Axis Bank</option>
                  <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                  <option value="Punjab National Bank">Punjab National Bank</option>
                </select>
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full btn bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-sm py-3 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all d-flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Securing Payment & GST Receipt...</span>
                </>
              ) : (
                <>
                  <FiLock className="w-4 h-4" />
                  <span>Pay ₹750 & Complete Registration</span>
                </>
              )}
            </button>

            <div className="text-center">
              <p className="text-[10px] text-slate-400 font-medium mb-0">
                100% Refundable counseling registration token as per AICTE/UGC guidelines.
              </p>
            </div>

          </div>
        ) : (
          /* Success & GST Receipt Screen */
          <div className="p-5 space-y-4">
            
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full d-inline-flex items-center justify-center mb-1">
                <FiCheckCircle className="w-7 h-7" />
              </div>
              <h3 className="text-base font-black text-slate-900 mb-0">Payment Successful!</h3>
              <p className="text-xs text-slate-500 font-semibold mb-0">Your application fee has been confirmed by the institution.</p>
            </div>

            {/* GST Tax Invoice Card */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
              <div className="d-flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-bold">Receipt Number:</span>
                <span className="font-mono font-black text-slate-900">{receiptData.receiptNumber}</span>
              </div>
              <div className="d-flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-bold">Transaction ID:</span>
                <span className="font-mono font-black text-indigo-700">{receiptData.transactionId}</span>
              </div>
              <div className="d-flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-bold">Candidate:</span>
                <span className="font-bold text-slate-900">{application.studentName}</span>
              </div>
              <div className="d-flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-bold">College Allotment:</span>
                <span className="font-bold text-slate-900">{application.collegeName}</span>
              </div>
              <div className="d-flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-bold">Payment Method:</span>
                <span className="font-bold text-slate-900">{receiptData.paymentMethod}</span>
              </div>
              <div className="d-flex justify-between pt-1">
                <span className="text-slate-700 font-black">Amount Paid (Inc. 18% GST):</span>
                <span className="font-black text-emerald-600 text-sm">₹{receiptData.amount}.00</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="d-flex gap-2">
              <button
                onClick={handlePrint}
                className="btn btn-light border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs py-2.5 px-4 rounded-xl flex-1 d-flex items-center justify-center gap-1.5"
              >
                <FiPrinter className="w-3.5 h-3.5" /> Print Receipt
              </button>
              <button
                onClick={onClose}
                className="btn bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex-1"
              >
                Done
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
