import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { FeaturedPhoto, PhotoSlot } from '../types';
import { ResilientImage } from './ResilientImage';

interface MemoriesGalleryProps {
  featuredPhoto: FeaturedPhoto;
  slideshowPhotos: PhotoSlot[];
}

export function MemoriesGallery({
  featuredPhoto,
  slideshowPhotos,
}: MemoriesGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPausedByHover, setIsPausedByHover] = useState(false);

  const totalSlides = slideshowPhotos.length;

  useEffect(() => {
    if (totalSlides <= 1 || !isAutoPlaying || isPausedByHover) {
      return;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [totalSlides, isAutoPlaying, isPausedByHover]);

  const activePhoto = slideshowPhotos[activeIndex] ?? slideshowPhotos[0];

  const handlePrev = () => {
    if (totalSlides === 0) return;
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    if (totalSlides === 0) return;
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  return (
    <section
      id="memories"
      aria-labelledby="memories-heading"
      className="bg-[#f7f1ed] px-6 py-24 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-[1160px]">
        <div className="grid grid-cols-1 gap-6 border-b border-[#2b1d19]/12 pb-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <h2
              id="memories-heading"
              className="font-serif-editorial text-4xl font-normal tracking-tight text-[#2b1d19] md:text-6xl"
            >
              O Que Guardo de Ti
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-[15px] leading-relaxed text-[#5e4741]">
              Não temos fotografias juntos mas guardo aqui uma fotografia tua que fiz enquanto dormias e outras mais que acompanham os meus dias.
            </p>
          </div>
        </div>

        {/* Foto principal: Companhia Sem Distância */}
        <article className="mt-16 grid grid-cols-1 items-end gap-8 md:mt-20 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-8">
            <div className="aspect-[4/3] overflow-hidden rounded-[2px]">
              <ResilientImage
                src={featuredPhoto.imageUrl}
                alt={featuredPhoto.title}
                fallbackTitle={featuredPhoto.title}
                placeholderLabel="Espaço reservado para a foto principal"
                className="h-full w-full"
              />
            </div>
          </div>

          <div className="space-y-4 pb-1 md:col-span-4">
            <p className="text-xs tracking-[0.1em] text-[#8d7670]">
              {featuredPhoto.dateLabel} · {featuredPhoto.location}
            </p>
            <h3 className="font-serif-editorial text-3xl font-normal leading-tight text-[#2b1d19] md:text-4xl">
              {featuredPhoto.title}
            </h3>
            <p className="text-sm leading-[1.75] text-[#5e4741]">
              {featuredPhoto.caption}
            </p>
            <p className="font-serif-editorial text-lg italic leading-relaxed text-[#5e4741]">
              {featuredPhoto.reflection}
            </p>
          </div>
        </article>

        {/* Carrossel automático com as 9 fotos dela */}
        {totalSlides > 0 && activePhoto && (
          <div className="mt-24 md:mt-32">
            <div className="mx-auto max-w-3xl">
              <div
                onMouseEnter={() => setIsPausedByHover(true)}
                onMouseLeave={() => setIsPausedByHover(false)}
                className="border border-[#2b1d19]/12 bg-[#fbf7f4] p-4 sm:p-7"
              >
                {/* Palco de crossfade suave entre as 9 fotos */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] sm:aspect-[4/3]">
                  {slideshowPhotos.map((photo, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <div
                        key={photo.id}
                        aria-hidden={!isActive}
                        className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out ${
                          isActive
                            ? 'z-10 scale-100 opacity-100'
                            : 'pointer-events-none z-0 scale-[1.02] opacity-0'
                        }`}
                      >
                        <ResilientImage
                          src={photo.imageUrl}
                          alt={photo.title}
                          fallbackTitle={photo.title}
                          placeholderLabel={`Espaço reservado · ${photo.numberLabel}`}
                          className="h-full w-full"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Legenda e controlos minimalistas do card */}
                <div className="mt-6 space-y-5">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                    <p className="font-serif-editorial text-xl italic text-[#2b1d19]">
                      {activePhoto.caption}
                    </p>
                    <span className="tabular-lining shrink-0 text-xs text-[#8d7670]">
                      {activePhoto.numberLabel}
                    </span>
                  </div>

                  {/* Barra de progresso das 9 fotos */}
                  <div
                    className="grid grid-cols-9 gap-1.5"
                    role="tablist"
                    aria-label="Selecionar fotografia"
                  >
                    {slideshowPhotos.map((photo, index) => {
                      const isActive = index === activeIndex;
                      return (
                        <button
                          key={photo.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          aria-label={`Ver ${photo.title}`}
                          onClick={() => setActiveIndex(index)}
                          className="group py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2b1d19]"
                        >
                          <span
                            className={`block h-[2px] w-full transition-colors duration-300 ${
                              isActive
                                ? 'bg-[#2b1d19]'
                                : 'bg-[#2b1d19]/18 group-hover:bg-[#2b1d19]/45'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between border-t border-[#2b1d19]/10 pt-4 text-xs text-[#5e4741]">
                    <button
                      type="button"
                      onClick={() => setIsAutoPlaying((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-[#2b1d19]"
                    >
                      {isAutoPlaying ? (
                        <>
                          <Pause className="h-3 w-3" />
                          <span>Pausar passagem</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3" />
                          <span>Retomar passagem</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-5">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="inline-flex items-center gap-1.5 transition-colors hover:text-[#2b1d19]"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        <span>Anterior</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="inline-flex items-center gap-1.5 transition-colors hover:text-[#2b1d19]"
                      >
                        <span>Próxima</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
