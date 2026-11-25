import { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle?: string;
  className?: string;
  imgClassName?: string;
}

export function ResilientImage({
  src,
  alt,
  fallbackTitle,
  className = '',
  imgClassName = '',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f4d9e2]/65 via-[#e2d8ee]/65 to-[#d6e3f2]/70 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="max-w-[22ch] space-y-2">
          <div className="mx-auto h-px w-8 bg-[#2e201d]/25" />
          <p className="font-serif-editorial text-lg italic text-[#2e201d]/80">
            {fallbackTitle || alt}
          </p>
          <div className="mx-auto h-px w-8 bg-[#2e201d]/25" />
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
