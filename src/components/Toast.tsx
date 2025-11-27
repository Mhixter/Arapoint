// src/components/Toast.tsx
import React, { createContext, useContext, useState } from 'react';

type Toast = { id: string; kind?: 'info'|'error'|'success'; message: string };
const ToastContext = createContext<any>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

export const ToastProvider: React.FC<{children:any}> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = (message: string, kind: Toast['kind'] = 'info') => {
    const t = { id: Date.now().toString(), message, kind };
    setToasts(s => [...s, t]);
    setTimeout(() => setToasts(s => s.filter(x => x.id !== t.id)), 6000);
  };
  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div style={{position:'fixed', right:16, bottom:16, zIndex:9999}}>
        {toasts.map(t => (
          <div key={t.id} style={{
            marginTop:8, padding:'10px 14px', borderRadius:8,
            boxShadow:'0 2px 8px rgba(0,0,0,0.15)',
            background: t.kind === 'error' ? '#ffe6e6' : t.kind === 'success' ? '#e6ffed' : '#e6f0ff'
          }}>
            <strong style={{display:'block'}}>{t.kind}</strong>
            <div>{t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
