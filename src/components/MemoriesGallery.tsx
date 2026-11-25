import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { MemoryItem } from '../types';
import { ResilientImage } from './ResilientImage';

interface MemoriesGalleryProps {
  memories: MemoryItem[];
}

export function MemoriesGallery({ memories }: MemoriesGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedMemory =
    selectedIndex !== null && memories[selectedIndex] ? memories[selectedIndex] : null;

  useEffect(() => {
    if (selectedIndex === null || memories.length === 0) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
      } else if (event.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % memories.length
        );
      } else if (event.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev - 1 + memories.length) % memories.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, memories.length]);

  if (memories.length === 0) {
    return null;
  }

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
              Shared Memories
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-[15px] leading-relaxed text-[#5e4741]">
              A few quiet frames I keep coming back to—open any print to read the note behind it.
            </p>
          </div>
        </div>

        {/* Varied photobook plate rhythm instead of uniform SaaS cards */}
        <div className="mt-16 space-y-24 md:mt-24 md:space-y-32">
          {memories.map((memory, index) => {
            const pattern = index % 4;
            const aspectClass =
              memory.aspect === 'portrait'
                ? 'aspect-[3/4]'
                : memory.aspect === 'square'
                  ? 'aspect-square'
                  : 'aspect-[4/3]';

            // Pattern 0: Wide left photograph with offset right editorial note
            if (pattern === 0) {
              return (
                <article
                  key={memory.id}
                  className="grid grid-cols-1 items-end gap-8 md:grid-cols-12 md:gap-12"
                >
                  <div className="md:col-span-8">
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2b1d19]"
                    >
                      <div className={`overflow-hidden rounded-[2px] ${aspectClass}`}>
                        <ResilientImage
                          src={memory.imageUrl}
                          alt={`${memory.title} — ${memory.location}`}
                          fallbackTitle={memory.title}
                          className="h-full w-full"
                          imgClassName="scale-[1.03] transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      </div>
                    </button>
                  </div>

                  <div className="space-y-3 pb-1 md:col-span-4">
                    <p className="tabular-lining text-xs tracking-[0.1em] text-[#8d7670]">
                      {memory.figureNumber} · {memory.dateLabel} · {memory.location}
                    </p>
                    <h3 className="font-serif-editorial text-3xl font-normal leading-tight text-[#2b1d19]">
                      <button
                        type="button"
                        onClick={() => setSelectedIndex(index)}
                        className="text-left transition-colors duration-150 hover:text-[#5e4741]"
                      >
                        {memory.title}
                      </button>
                    </h3>
                    <p className="text-sm leading-[1.7] text-[#5e4741]">
                      {memory.caption}
                    </p>
                  </div>
                </article>
              );
            }

            // Pattern 1: Right-aligned editorial portrait print with left offset caption
            if (pattern === 1) {
              return (
                <article
                  key={memory.id}
                  className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12"
                >
                  <div className="order-2 space-y-3 md:order-1 md:col-span-4 md:col-start-2">
                    <p className="tabular-lining text-xs tracking-[0.1em] text-[#8d7670]">
                      {memory.figureNumber} · {memory.dateLabel} · {memory.location}
                    </p>
                    <h3 className="font-serif-editorial text-3xl font-normal leading-tight text-[#2b1d19]">
                      <button
                        type="button"
                        onClick={() => setSelectedIndex(index)}
                        className="text-left transition-colors duration-150 hover:text-[#5e4741]"
                      >
                        {memory.title}
                      </button>
                    </h3>
                    <p className="text-sm leading-[1.7] text-[#5e4741]">
                      {memory.caption}
                    </p>
                  </div>

                  <div className="order-1 md:order-2 md:col-span-6 md:col-start-7">
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2b1d19]"
                    >
                      <div className={`overflow-hidden rounded-[2px] ${aspectClass}`}>
                        <ResilientImage
                          src={memory.imageUrl}
                          alt={`${memory.title} — ${memory.location}`}
                          fallbackTitle={memory.title}
                          className="h-full w-full"
                          imgClassName="scale-[1.03] transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      </div>
                    </button>
                  </div>
                </article>
              );
            }

            // Pattern 2: Full-span serene horizon plate
            if (pattern === 2) {
              return (
                <article key={memory.id} className="space-y-5">
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2b1d19]"
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden rounded-[2px]">
                      <ResilientImage
                        src={memory.imageUrl}
                        alt={`${memory.title} — ${memory.location}`}
                        fallbackTitle={memory.title}
                        className="h-full w-full"
                        imgClassName="scale-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                  </button>

                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-baseline">
                    <div className="space-y-1">
                      <h3 className="font-serif-editorial text-3xl font-normal text-[#2b1d19]">
                        <button
                          type="button"
                          onClick={() => setSelectedIndex(index)}
                          className="text-left transition-colors duration-150 hover:text-[#5e4741]"
                        >
                          {memory.title}
                        </button>
                      </h3>
                      <p className="text-sm text-[#5e4741]">{memory.caption}</p>
                    </div>
                    <p className="tabular-lining shrink-0 text-xs tracking-[0.1em] text-[#8d7670]">
                      {memory.figureNumber} · {memory.dateLabel} · {memory.location}
                    </p>
                  </div>
                </article>
              );
            }

            // Pattern 3: Quiet centered square still life
            return (
              <article
                key={memory.id}
                className="mx-auto max-w-xl space-y-5 text-center"
              >
                <button
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className="group block w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2b1d19]"
                >
                  <div className={`overflow-hidden rounded-[2px] ${aspectClass}`}>
                    <ResilientImage
                      src={memory.imageUrl}
                      alt={`${memory.title} — ${memory.location}`}
                      fallbackTitle={memory.title}
                      className="h-full w-full"
                      imgClassName="scale-[1.07] transition-transform duration-700 ease-out group-hover:scale-[1.09]"
                    />
                  </div>
                </button>

                <div className="space-y-2 pt-1">
                  <p className="tabular-lining text-xs tracking-[0.1em] text-[#8d7670]">
                    {memory.figureNumber} · {memory.dateLabel} · {memory.location}
                  </p>
                  <h3 className="font-serif-editorial text-3xl font-normal text-[#2b1d19]">
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      className="transition-colors duration-150 hover:text-[#5e4741]"
                    >
                      {memory.title}
                    </button>
                  </h3>
                  <p className="mx-auto max-w-md text-sm leading-[1.7] text-[#5e4741]">
                    {memory.caption}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {selectedMemory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f1512]/92 p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative grid max-h-[92vh] w-full max-w-5xl grid-cols-1 overflow-y-auto bg-[#f7f1ed] lg:grid-cols-12"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close photograph"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f1ed]/90 text-[#2b1d19] transition-colors duration-150 hover:bg-[#2b1d19] hover:text-[#f7f1ed]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="bg-[#2b1d19] lg:col-span-7">
              <div className="aspect-[4/3] h-full w-full lg:aspect-auto lg:min-h-[500px]">
                <ResilientImage
                  src={selectedMemory.imageUrl}
                  alt={selectedMemory.title}
                  fallbackTitle={selectedMemory.title}
                  className="h-full w-full"
                  imgClassName="scale-[1.06]"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between p-8 md:p-12 lg:col-span-5">
              <div className="space-y-5">
                <p className="tabular-lining text-xs tracking-[0.1em] text-[#8d7670]">
                  {selectedMemory.figureNumber} · {selectedMemory.dateLabel} · {selectedMemory.location}
                </p>

                <h3
                  id="lightbox-title"
                  className="font-serif-editorial text-3xl font-normal leading-tight text-[#2b1d19]"
                >
                  {selectedMemory.title}
                </h3>

                <div className="h-px w-10 bg-[#2b1d19]/20" />

                <p className="font-serif-editorial text-xl leading-[1.65] text-[#45312c]">
                  {selectedMemory.reflection}
                </p>
              </div>

              <div className="mt-10 flex items-center justify-between border-t border-[#2b1d19]/12 pt-6">
                <span className="tabular-lining text-xs text-[#8d7670]">
                  {(selectedIndex ?? 0) + 1} of {memories.length}
                </span>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedIndex((prev) =>
                        prev === null
                          ? null
                          : (prev - 1 + memories.length) % memories.length
                      )
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2b1d19] transition-opacity hover:opacity-65"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedIndex((prev) =>
                        prev === null ? null : (prev + 1) % memories.length
                      )
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2b1d19] transition-opacity hover:opacity-65"
                  >
                    <span>Next</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
