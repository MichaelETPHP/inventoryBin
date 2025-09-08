import React from 'react';
import { AlertTriangle } from 'lucide-react';

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
  if (!isOpen) return null;

  const getColorClasses = () => {
    switch (type) {
      case 'danger':
        return {
          bg: 'bg-red-50',
          icon: 'text-red-600',
          button: 'bg-red-600 hover:bg-red-700'
        };
      case 'info':
        return {
          bg: 'bg-blue-50',
          icon: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700'
        };
      default:
        return {
          bg: 'bg-amber-50',
          icon: 'text-amber-600',
          button: 'bg-amber-600 hover:bg-amber-700'
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className={`${colors.bg} px-6 py-4 rounded-t-lg`}>
          <div className="flex items-center gap-3">
            <AlertTriangle className={`w-6 h-6 ${colors.icon}`} />
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          </div>
        </div>
        
        <div className="px-6 py-4">
          <p className="text-gray-700">{message}</p>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded-lg transition-colors duration-200 ${colors.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};