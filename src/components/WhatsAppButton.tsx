import React, { useState } from 'react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '256793662386',
  defaultMessage = "Hello Ntamba Processors! I'd like to inquire about your products (Coffee, Honey, Dried Fruits) or wholesale opportunities.",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(defaultMessage);
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodedText}`;

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center group print:hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Expanded Tooltip / Badge */}
      <div
        className={`hidden sm:flex items-center mr-3 px-3.5 py-2 rounded-full bg-[#1F1916]/95 backdrop-blur-md text-white text-xs font-medium border border-white/10 shadow-xl transition-all duration-300 pointer-events-none transform ${
          isHovered
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        <div className="flex flex-col text-left">
          <span className="font-semibold text-white flex items-center gap-1.5 font-ui">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Quick WhatsApp Chat
          </span>
          <span className="text-[11px] text-stone-300 font-mono">+256 793 662 386</span>
        </div>
      </div>

      {/* Floating Action Link Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Ntamba Processors on WhatsApp at +256 793 662 386"
        className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg hover:shadow-2xl transform hover:scale-108 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50"
      >
        {/* Subtle Online Pulse Ring */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 sm:h-3.5 sm:w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 sm:h-3.5 sm:w-3.5 bg-emerald-400 border-2 border-white" />
        </span>

        {/* WhatsApp Official Vector Logo */}
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 fill-current drop-shadow-sm"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.04 7.5C8.87 7.5 8.6 7.57 8.36 7.83C8.13 8.09 7.48 8.7 7.48 9.94C7.48 11.19 8.39 12.39 8.52 12.56C8.65 12.73 10.3 15.28 12.83 16.37C13.43 16.63 13.9 16.79 14.26 16.9C14.87 17.1 15.42 17.07 15.86 17C16.35 16.93 17.36 16.39 17.57 15.8C17.78 15.21 17.78 14.7 17.71 14.6C17.65 14.5 17.48 14.43 17.23 14.31C16.98 14.19 15.75 13.58 15.52 13.5C15.29 13.41 15.13 13.37 14.96 13.63C14.8 13.88 14.33 14.43 14.19 14.6C14.05 14.76 13.91 14.78 13.66 14.66C13.41 14.53 12.61 14.27 11.66 13.42C10.92 12.76 10.42 11.94 10.28 11.69C10.13 11.44 10.26 11.31 10.39 11.18C10.5 11.07 10.63 10.9 10.76 10.75C10.88 10.61 10.92 10.5 11 10.33C11.09 10.17 11.04 10.02 10.98 9.9C10.92 9.77 10.45 8.63 10.26 8.17C10.07 7.72 9.88 7.78 9.73 7.77C9.59 7.77 9.43 7.76 9.26 7.76C9.1 7.76 8.87 7.7 8.7 7.87L9.04 7.5Z" />
        </svg>
      </a>
    </div>
  );
};
