import React from 'react';
import { Check, Sparkles, Info, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#141418]/95 backdrop-blur-md border border-[#30303c] text-[#f8f6f0] p-4 shadow-2xl transition-all duration-300 flex items-start justify-between gap-3 animate-in fade-in slide-in-from-bottom-3"
        >
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#c5a880]/15 text-[#c5a880] flex items-center justify-center shrink-0 mt-0.5">
              {toast.type === 'success' ? (
                <Check className="w-3 h-3" />
              ) : toast.type === 'info' ? (
                <Info className="w-3 h-3" />
              ) : (
                <Sparkles className="w-3 h-3" />
              )}
            </div>
            <div>
              <p className="text-xs font-semibold text-[#f8f6f0] tracking-wide">
                {toast.message}
              </p>
              {toast.subtitle && (
                <p className="text-[11px] text-[#a8a49c] mt-0.5">
                  {toast.subtitle}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#726e67] hover:text-[#f8f6f0] p-0.5 cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
