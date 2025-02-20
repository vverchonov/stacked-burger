'use client';

import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#F06002] rounded-3xl w-full max-w-lg mx-4 p-6 sm:p-8 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-black transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="mt-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 font-arial-black text-center">
            CHOOSE LOCATION
          </h2>

          {/* Buttons */}
          <div className="flex flex-col gap-4">
            <a
              href="https://www.order.store/ca/store/stacked-burger-%26-chicken/XktmNg6fVmedzVpHywQWPA"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white text-black text-center py-3 sm:py-4 px-4 sm:px-6 rounded-full 
                       font-bold text-base sm:text-lg hover:bg-opacity-90 transition-all duration-300"
            >
              125 KING STREET
            </a>
            <a
              href="https://www.order.store/store/stacked-burger-%26-chicken/JGxu7H6CVWyhJknf12R1EA"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white text-black text-center py-3 sm:py-4 px-4 sm:px-6 rounded-full 
                       font-bold text-base sm:text-lg hover:bg-opacity-90 transition-all duration-300"
            >
              CHERRYHILL MALL
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal; 