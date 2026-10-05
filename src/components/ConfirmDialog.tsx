import React, { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { usePresence } from '../hooks/usePresence';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'warning' | 'danger' | 'info';
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  type = 'warning'
}) => {
  const mounted = usePresence(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onCancel]);

  if (!mounted) return null;

  const state = isOpen ? 'open' : 'closed';

  const getColorClasses = () => {
    switch (type) {
      case 'danger':
        return {
          bg: 'bg-rose-50',
          icon: 'text-rose-600',
          button: 'bg-rose-600 hover:bg-rose-700'
        };
      case 'info':
        return {
          bg: 'bg-blue-50',
          icon: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700'
        };
      default:
        return {
          bg: 'bg-gold-50',
          icon: 'text-gold-700',
          button: 'bg-brand-700 hover:bg-brand-800'
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div
      data-state={state}
      onClick={onCancel}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink-900/0 backdrop-blur-0 transition-colors duration-300 ease-out data-[state=open]:bg-ink-900/50 data-[state=open]:backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      <div
        data-state={state}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-xl overflow-hidden shadow-panel-lg translate-y-full opacity-0 sm:translate-y-0 sm:scale-95 transition-[transform,opacity] duration-300 ease-drawer sm:ease-out-strong data-[state=open]:translate-y-0 data-[state=open]:opacity-100 sm:data-[state=open]:scale-100"
      >
        <div className="sm:hidden flex justify-center pt-2.5 pb-1">
          <div className="w-9 h-1 rounded-full bg-cream-200" />
        </div>

        <div className={`${colors.bg} px-6 py-4`}>
          <div className="flex items-center gap-3">
            <AlertTriangle className={`w-6 h-6 ${colors.icon}`} />
            <h3 id="confirm-dialog-title" className="text-lg font-semibold text-ink-900">{title}</h3>
          </div>
        </div>

        <div className="px-6 py-4">
          <p className="text-ink-700">{message}</p>
        </div>

        <div className="px-6 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-4 bg-cream-50 flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-ink-700 border border-cream-200 rounded-lg hover:bg-white transition duration-150 ease-out active:scale-[0.97]"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            autoFocus
            className={`px-4 py-2 text-white rounded-lg transition duration-150 ease-out active:scale-[0.97] ${colors.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
