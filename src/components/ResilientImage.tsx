import { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle?: string;
  placeholderLabel?: string;
  className?: string;
  imgClassName?: string;
}

export function ResilientImage({
  src,
  alt,
  fallbackTitle,
  placeholderLabel = 'Espaço reservado para fotografia',
  className = '',
  imgClassName = '',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src.trim()) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden border border-[#2b1d19]/12 bg-gradient-to-br from-[#f5dde4]/80 via-[#e8def2]/75 to-[#dce7f4]/80 p-8 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="max-w-[26ch] space-y-3">
          <div className="mx-auto h-px w-8 bg-[#2b1d19]/25" />
          <p className="font-serif-editorial text-xl italic leading-snug text-[#2b1d19]/85">
            {fallbackTitle || alt}
          </p>
          <p className="text-[11px] tracking-[0.1em] text-[#5e4741]/80">
            {placeholderLabel}
          </p>
          <div className="mx-auto h-px w-8 bg-[#2b1d19]/25" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#ede0d8]/45 ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  );
}
