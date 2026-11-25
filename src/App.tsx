import { useCallback, useEffect, useState } from 'react';
import { KEEPSAKE } from './data/keepsake';
import { ResilientImage } from './components/ResilientImage';
import { CountdownSection } from './components/CountdownSection';
import { DailyRevealsSection } from './components/DailyRevealsSection';
import { MemoriesGallery } from './components/MemoriesGallery';
import { DigitalLetterSection } from './components/DigitalLetterSection';
import { SongPlayer } from './components/SongPlayer';

function getLocalDateKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function App() {
  const [todayDateKey, setTodayDateKey] = useState<string>(() =>
    getLocalDateKey()
  );
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);

  // Mantém a data local sincronizada para desbloquear à meia-noite de 4 de dezembro
  useEffect(() => {
    const interval = window.setInterval(() => {
      const nextKey = getLocalDateKey();
      setTodayDateKey((prev) => (prev === nextKey ? prev : nextKey));
    }, 30000);
    return () => window.clearInterval(interval);
  }, []);

  const handleSongPlayChange = useCallback((playing: boolean) => {
    setIsSongPlaying(playing);
    if (playing) {
      setIsVoicePlaying(false);
    }
  }, []);

  const handleVoicePlayChange = useCallback((playing: boolean) => {
    setIsVoicePlaying(playing);
    if (playing) {
      setIsSongPlaying(false);
    }
  }, []);

  const isBirthdayUnlocked =
    KEEPSAKE.previewBirthdayMode || todayDateKey >= KEEPSAKE.birthdayDateKey;

  return (
    <div className="min-h-screen bg-[#f7f1ed] text-[#2b1d19]">
      {/* Abertura em tons pastel */}
      <div id="top" className="editorial-pastel-sky">
        <header className="mx-auto flex max-w-[1160px] items-baseline justify-between gap-8 px-6 pt-8 pb-6 md:px-12 md:pt-12">
          <span className="font-serif-editorial whitespace-nowrap shrink-0 text-xl italic text-[#2b1d19]">
            Para {KEEPSAKE.recipientName}
          </span>

          <nav
            aria-label="Secções da página"
            className="flex items-center gap-5 text-xs tracking-[0.06em] text-[#5e4741] sm:gap-8"
          >
            <a
              href="#countdown"
              className="whitespace-nowrap shrink-0 border-b border-transparent pb-0.5 transition-colors duration-150 hover:border-[#2b1d19]/50 hover:text-[#2b1d19]"
            >
              Contagem
            </a>
            <a
              href="#daily"
              className="whitespace-nowrap shrink-0 border-b border-transparent pb-0.5 transition-colors duration-150 hover:border-[#2b1d19]/50 hover:text-[#2b1d19]"
            >
              Notas Diárias
            </a>
            <a
              href="#memories"
              className="whitespace-nowrap shrink-0 border-b border-transparent pb-0.5 transition-colors duration-150 hover:border-[#2b1d19]/50 hover:text-[#2b1d19]"
            >
              Galeria
            </a>
            <a
              href="#letter"
              className="whitespace-nowrap shrink-0 border-b border-transparent pb-0.5 transition-colors duration-150 hover:border-[#2b1d19]/50 hover:text-[#2b1d19]"
            >
              Carta
            </a>
          </nav>
        </header>

        <main>
          <section className="mx-auto grid max-w-[1160px] grid-cols-1 items-end gap-12 px-6 pt-8 pb-20 md:px-12 md:pt-14 md:pb-28 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-8 lg:col-span-6 lg:pb-2">
              <p className="text-xs tracking-[0.14em] text-[#5e4741]">
                4 de Dezembro
              </p>

              <h1
                className="font-serif-editorial text-[clamp(2.75rem,5vw,4.5rem)] font-normal leading-[1.03] tracking-tight text-[#2b1d19]"
                style={{ textWrap: 'balance' }}
              >
                {KEEPSAKE.heroHeadline}
              </h1>

              <p className="max-w-md text-[15px] leading-[1.8] text-[#5e4741]">
                {KEEPSAKE.heroLead}
              </p>

              <div className="pt-1">
                <a
                  href={isBirthdayUnlocked ? '#letter' : '#daily'}
                  className="inline-block border-b border-[#2b1d19]/45 pb-1 font-serif-editorial text-lg italic text-[#2b1d19] transition-colors duration-150 hover:border-[#2b1d19]"
                >
                  {isBirthdayUnlocked
                    ? 'Ler a carta de aniversário'
                    : 'Abrir a nota de hoje'}
                </a>
              </div>

              <div className="max-w-md pt-4">
                <SongPlayer
                  title={KEEPSAKE.songTitle}
                  artist={KEEPSAKE.songArtist}
                  youtubeId={KEEPSAKE.songYoutubeId}
                  songPath={KEEPSAKE.songPath}
                  isPlaying={isSongPlaying}
                  onPlayStateChange={handleSongPlayChange}
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-[2px]">
                <ResilientImage
                  src={KEEPSAKE.heroImageUrl}
                  alt={KEEPSAKE.heroImageCaption}
                  fallbackTitle={`Para ${KEEPSAKE.recipientName}`}
                  placeholderLabel="Espaço reservado para a tua fotografia"
                  className="h-full w-full"
                />
              </div>
              <p className="mt-3 font-serif-editorial text-sm italic text-[#5e4741]">
                {KEEPSAKE.heroImageCaption}
              </p>
            </div>
          </section>
        </main>
      </div>

      <CountdownSection
        recipientName={KEEPSAKE.recipientName}
        targetDateIso={KEEPSAKE.birthdayIso}
        title={KEEPSAKE.countdownTitle}
      />

      <DailyRevealsSection
        items={KEEPSAKE.dailyReveals}
        todayDateKey={todayDateKey}
        previewAll={KEEPSAKE.previewBirthdayMode}
      />

      <MemoriesGallery
        featuredPhoto={KEEPSAKE.featuredPhoto}
        slideshowPhotos={KEEPSAKE.slideshowPhotos}
      />

      <DigitalLetterSection
        recipientName={KEEPSAKE.recipientName}
        senderName={KEEPSAKE.senderName}
        salutation={KEEPSAKE.letterSalutation}
        body={KEEPSAKE.letterBody}
        closing={KEEPSAKE.letterClosing}
        isUnlocked={isBirthdayUnlocked}
        voiceNotePath={KEEPSAKE.voiceNotePath}
        voiceNoteLabel={KEEPSAKE.voiceNoteLabel}
        isVoicePlaying={isVoicePlaying}
        onVoicePlayStateChange={handleVoicePlayChange}
      />

      {/* Rodapé em castanho espresso */}
      <footer className="bg-[#2b1d19] px-6 py-16 text-[#f5ede8] md:px-12">
        <div className="mx-auto flex max-w-[1160px] flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="font-serif-editorial text-lg italic text-[#ead9d2]">
            Para {KEEPSAKE.recipientName}, de {KEEPSAKE.senderName}
          </p>

          <a
            href="#top"
            className="text-xs tracking-[0.06em] text-[#cdb8b0] transition-colors duration-150 hover:text-[#f5ede8]"
          >
            Voltar ao topo
          </a>
        </div>
      </footer>
    </div>
  );
}
