import { useState } from 'react';
import { DailyRevealItem } from '../types';

interface DailyRevealsSectionProps {
  items: DailyRevealItem[];
  todayDateKey: string;
  previewAll: boolean;
}

export function DailyRevealsSection({
  items,
  todayDateKey,
  previewAll,
}: DailyRevealsSectionProps) {
  // A primeira nota fica visível a partir de hoje para iniciar a sequência até 3 de dezembro
  const unlockedItems = items.filter(
    (item, index) => index === 0 || previewAll || item.unlockDate <= todayDateKey
  );
  const lockedItems = items.filter(
    (item, index) => index > 0 && !previewAll && item.unlockDate > todayDateKey
  );

  const latestUnlocked =
    unlockedItems.length > 0
      ? unlockedItems[unlockedItems.length - 1]
      : items[0];

  const [selectedId, setSelectedId] = useState<string>(
    latestUnlocked?.id ?? ''
  );

  const activeItem =
    unlockedItems.find((item) => item.id === selectedId) ?? latestUnlocked;

  return (
    <section
      id="daily"
      aria-labelledby="daily-heading"
      className="border-b border-[#2b1d19]/10 bg-[#faf6f3] px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1160px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Coluna esquerda: Índice diário dos livros */}
          <div className="space-y-6 lg:col-span-5">
            <div className="space-y-2 border-b border-[#2b1d19]/12 pb-6">
              <p className="text-xs tracking-[0.12em] text-[#8d7670]">
                Dia após dia · Até 4 de Dezembro
              </p>
              <h2
                id="daily-heading"
                className="font-serif-editorial text-3xl font-normal text-[#2b1d19] md:text-4xl"
              >
                Oito livros, oito notas até ao teu dia
              </h2>
            </div>

            <div className="divide-y divide-[#2b1d19]/10">
              {items.map((item, index) => {
                const isUnlocked =
                  index === 0 || previewAll || item.unlockDate <= todayDateKey;
                const isToday =
                  item.unlockDate === todayDateKey ||
                  (index === 0 && todayDateKey < item.unlockDate);
                const isSelected = activeItem?.id === item.id && isUnlocked;

                if (!isUnlocked) {
                  return (
                    <div
                      key={item.id}
                      className="flex items-baseline justify-between gap-4 py-3.5 text-[#8d7670]/70"
                    >
                      <span className="font-serif-editorial text-lg italic">
                        {item.dateLabel}
                      </span>
                      <span className="text-xs tracking-[0.04em]">
                        Abre a {item.dateLabel}
                      </span>
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={`flex w-full items-baseline justify-between gap-4 py-3.5 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2b1d19] ${
                      isSelected
                        ? 'text-[#2b1d19]'
                        : 'text-[#5e4741] hover:text-[#2b1d19]'
                    }`}
                  >
                    <span className="min-w-0 font-serif-editorial text-xl">
                      <span
                        className={
                          isSelected
                            ? 'border-b border-[#2b1d19] pb-0.5'
                            : undefined
                        }
                      >
                        {item.dateLabel}
                      </span>
                      <span className="ml-3 text-base italic text-[#5e4741]">
                        — {item.bookTitle}
                      </span>
                    </span>

                    <span className="shrink-0 text-[11px] tracking-[0.06em] text-[#8d7670]">
                      {isToday ? 'Hoje' : 'Aberto'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Coluna direita: Nota literária desbloqueada do dia */}
          <div className="flex flex-col justify-center lg:col-span-7">
            {activeItem ? (
              <div className="editorial-pastel-ribbon border border-[#2b1d19]/10 px-8 py-12 md:px-14 md:py-16">
                <p className="text-xs tracking-[0.1em] text-[#5e4741]">
                  {activeItem.dateLabel}
                  {activeItem.unlockDate === todayDateKey ||
                  (activeItem.id === items[0]?.id &&
                    todayDateKey < activeItem.unlockDate)
                    ? ' · Nota de hoje'
                    : ''}
                </p>

                <p className="mt-4 font-serif-editorial text-lg italic text-[#5e4741]">
                  {activeItem.bookTitle} · {activeItem.bookAuthor}
                </p>

                <h3 className="mt-2 font-serif-editorial text-3xl font-normal leading-tight text-[#2b1d19] md:text-4xl">
                  {activeItem.title}
                </h3>

                <div className="my-6 h-px w-12 bg-[#2b1d19]/20" />

                <p className="font-serif-editorial text-xl leading-[1.7] text-[#2b1d19] md:text-2xl">
                  {activeItem.note}
                </p>

                {lockedItems.length > 0 && (
                  <p className="mt-10 text-xs text-[#5e4741]">
                    {lockedItems.length === 1
                      ? 'Falta 1 nota antes da carta de aniversário abrir a 4 de dezembro.'
                      : `Faltam ${lockedItems.length} notas antes da carta de aniversário abrir a 4 de dezembro.`}
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
