import React from 'react';

export interface NtambaLogoProps {
  variant?: 'horizontal' | 'stacked' | 'emblem';
  colorScheme?: 'default' | 'white' | 'badge';
  className?: string;
  height?: number | string;
  alt?: string;
}

/**
 * Ntamba Processors Official Brand Logo
 * Optimized with transparent background to blend seamlessly across light, ivory, and dark palettes.
 */
export const NtambaLogo: React.FC<NtambaLogoProps> = ({
  variant = 'horizontal',
  colorScheme = 'default',
  className = '',
  height,
  alt = 'Ntamba Processors - Agricultural Value Addition',
}) => {
  // Determine correct vector source
  let src = '/images/ntamba-logo-horizontal.svg';

  if (variant === 'emblem') {
    src = '/images/ntamba-emblem.svg';
  } else if (variant === 'stacked') {
    src = '/images/ntamba-logo-stacked.svg';
  } else if (colorScheme === 'white') {
    src = '/images/ntamba-logo-white.svg';
  }

  // If badge mode is requested for high-contrast dark backdrops:
  if (colorScheme === 'badge') {
    return (
      <div className={`inline-flex items-center bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-white/20 ${className}`}>
        <img
          src="/images/ntamba-logo-horizontal.svg"
          alt={alt}
          style={{ height: height || 44 }}
          className="w-auto object-contain select-none"
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center shrink-0 ${className}`}>
      <img
        src={src}
        alt={alt}
        style={{ height: height || (variant === 'stacked' ? 72 : 46) }}
        className="w-auto max-w-full object-contain select-none transition-transform duration-300 group-hover:scale-102"
        loading="eager"
      />
    </div>
  );
};
