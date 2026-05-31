'use client';

import { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DELIVERY_URL =
  'https://www.ubereats.com/store/stacked-burger-%26-chicken/XktmNg6fVmedzVpHywQWPA?diningMode=DELIVERY&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMjM1NSUyMFNhbmRyaW5naGFtJTIwQ3Jlc2NlbnQlMjAlMjM0OCUyMiUyQyUyMnJlZmVyZW5jZSUyMiUzQSUyMkVqZ3pOVFVnVTJGdVpISnBibWRvWVcwZ1EzSmxjMk5sYm5RZ0l6UTRMQ0JNYjI1a2IyNHNJRTlPSUU0MlF5QTFTek1zSUVOaGJtRmtZU0llR2h3S0Znb1VDaElKTi1qSUpyYnpMb2dSV3VmLTBmc3ZsS2NTQWpRNCUyMiUyQyUyMnJlZmVyZW5jZVR5cGUlMjIlM0ElMjJnb29nbGVfcGxhY2VzJTIyJTJDJTIybGF0aXR1ZGUlMjIlM0E0Mi45NDgyMTI4JTJDJTIybG9uZ2l0dWRlJTIyJTNBLTgxLjIyOTY0NzglN0Q%3D&utm_source=menu-maker';

const PICKUP_LOCATIONS = [
  {
    label: '125 KING STREET (Downtown)',
    href: 'https://order.toasttab.com/online/stacked-burger-and-chicken-125-king-st?diningOption=takeout&rwg_token=AFd1xnGovGh-m9XCF1HbrtYHvoT2a8XgzG9LCPe2vNj0SzlOaYNDUNENCTQfMFQQjv3Ssp3nGLPvLbW-5BVZNshYNi8qAhbAAg%3D%3D',
    available: true,
  },
  {
    label: 'CHERRYHILL MALL (North)',
    href: 'https://order.toasttab.com/online/stacked-burger-22-301-oxford-street-west?diningOption=takeout&rwg_token=AFd1xnFFp24mfk4GfVFWnn7QIBa8vyWCwH2OHkSc7407oPWw9riP_tpkVAuNZiXzCFJ6ie4LlckApwCcrA6MRGetpvppsgpieg%3D%3D',
    available: true,
  },
  {
    label: 'COMING SOON',
    sublabel: '775 Southdale Rd E (South)',
    available: false,
  },
] as const;

const buttonClass =
  'w-full bg-white text-black text-center py-3 sm:py-4 px-4 sm:px-6 rounded-full font-bold text-base sm:text-lg hover:bg-opacity-90 transition-all duration-300';

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const [step, setStep] = useState<'mode' | 'pickup'>('mode');

  const handleClose = () => {
    setStep('mode');
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setStep('mode');
      return;
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setStep('mode');
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleDelivery = () => {
    window.open(DELIVERY_URL, '_blank', 'noopener,noreferrer');
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative bg-[#F06002] rounded-3xl w-full max-w-lg mx-4 p-6 sm:p-8 shadow-xl">
        <button
          onClick={handleClose}
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

        <div className="mt-4">
          {step === 'mode' ? (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 font-arial-black text-center">
                HOW WOULD YOU LIKE TO ORDER?
              </h2>
              <div className="flex flex-col gap-4">
                <button type="button" onClick={handleDelivery} className={buttonClass}>
                  DELIVERY
                </button>
                <button
                  type="button"
                  onClick={() => setStep('pickup')}
                  className={`${buttonClass} flex flex-col items-center gap-1 ring-2 ring-[#F06002] ring-offset-2 ring-offset-[#F06002] shadow-md`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-6 h-6 sm:w-7 sm:h-7 text-[#F06002] shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    PICK UP
                  </span>
                  <span className="text-[#F06002] text-sm sm:text-base font-bold">
                    Skip the fees!
                  </span>
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 font-arial-black text-center">
                CHOOSE LOCATION
              </h2>
              <div className="flex flex-col gap-4">
                {PICKUP_LOCATIONS.map((location) =>
                  location.available ? (
                    <a
                      key={location.label}
                      href={location.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClass}
                    >
                      {location.label}
                    </a>
                  ) : (
                    <div
                      key={location.label}
                      className={`${buttonClass} opacity-60 cursor-not-allowed flex flex-col gap-1`}
                      aria-disabled="true"
                    >
                      <span>{location.label}</span>
                      {'sublabel' in location && (
                        <span className="text-sm font-normal">{location.sublabel}</span>
                      )}
                    </div>
                  )
                )}
              </div>
              <button
                type="button"
                onClick={() => setStep('mode')}
                className="mt-6 w-full text-white text-center text-sm font-bold hover:underline transition-colors"
              >
                Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
