import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ComparisonProvider } from './context/ComparisonContext';
import { SavedCollegesProvider } from './context/SavedCollegesContext';
import { AppRoutes } from './routes/AppRoutes';
import { AICounselorWidget } from './components/features/ai/AICounselorWidget';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ComparisonProvider>
            <SavedCollegesProvider>
              <AppRoutes />
              <AICounselorWidget />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#111726',
                    color: '#fff',
                    borderRadius: '12px',
                    border: '1px solid #1e293b',
                  },
                }}
              />
            </SavedCollegesProvider>
          </ComparisonProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
