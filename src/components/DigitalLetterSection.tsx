import { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

interface DigitalLetterSectionProps {
  recipientName: string;
  senderName: string;
  salutation: string;
  body: string;
  closing: string;
  isUnlocked: boolean;
  voiceNotePath: string;
  voiceNoteLabel: string;
  isVoicePlaying: boolean;
  onVoicePlayStateChange: (playing: boolean) => void;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export function DigitalLetterSection({
  recipientName,
  senderName,
  salutation,
  body,
  closing,
  isUnlocked,
  voiceNotePath,
  voiceNoteLabel,
  isVoicePlaying,
  onVoicePlayStateChange,
}: DigitalLetterSectionProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const hasVoiceFile = Boolean(voiceNotePath.trim());

  const paragraphs = useMemo(() => {
    return body
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }, [body]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasVoiceFile || !isUnlocked) return;

    if (isVoicePlaying) {
      setStatusMessage(null);
      const playPromise = audio.play();
      if (playPromise) {
        playPromise.catch(() => {
          onVoicePlayStateChange(false);
          setStatusMessage('Não foi possível reproduzir a nota de voz.');
        });
      }
    } else {
      audio.pause();
    }
  }, [isVoicePlaying, hasVoiceFile, isUnlocked, onVoicePlayStateChange]);

  const progressPercent =
    duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const handleToggleVoice = () => {
    if (!hasVoiceFile) {
      setStatusMessage(
        'Cola o caminho da tua nota de voz em VOICE_NOTE_PATH dentro de src/data/keepsake.ts.'
      );
      return;
    }
    setStatusMessage(null);
    onVoicePlayStateChange(!isVoicePlaying);
  };

  const handleSeek = (nextValue: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = nextValue;
    setCurrentTime(nextValue);
  };

  return (
    <section
      id="letter"
      aria-labelledby="letter-heading"
      className="editorial-letter-wash border-t border-[#2b1d19]/10 px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-[660px]">
        {!isUnlocked ? (
          <div className="border-y border-[#2b1d19]/18 py-16 text-center md:py-24">
            <p className="text-xs tracking-[0.14em] text-[#8d7670]">
              4 de Dezembro
            </p>
            <h2
              id="letter-heading"
              className="mt-4 font-serif-editorial text-4xl font-normal italic text-[#2b1d19] md:text-5xl"
            >
              Guardada para o teu dia, {recipientName}
            </h2>
            <p className="mx-auto mt-5 max-w-md font-serif-editorial text-xl leading-relaxed text-[#5e4741]">
              Esta carta — e a minha voz a lê-la para ti — vai abrir-se aqui no dia quatro de dezembro.
            </p>
          </div>
        ) : (
          <div className="border-t border-[#2b1d19]/18 pt-10">
            <h2
              id="letter-heading"
              className="font-serif-editorial text-3xl font-normal italic text-[#2b1d19] md:text-4xl"
            >
              {salutation}
            </h2>

            <div className="mt-7 border-y border-[#2b1d19]/12 py-4">
              {hasVoiceFile && (
                <audio
                  ref={audioRef}
                  src={voiceNotePath}
                  preload="metadata"
                  onLoadedMetadata={(e) =>
                    setDuration(e.currentTarget.duration || 0)
                  }
                  onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                  onEnded={() => {
                    onVoicePlayStateChange(false);
                    setCurrentTime(0);
                  }}
                  onError={() => {
                    onVoicePlayStateChange(false);
                    setStatusMessage(
                      'Nota de voz não encontrada. Verifica VOICE_NOTE_PATH em src/data/keepsake.ts.'
                    );
                  }}
                />
              )}

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  aria-label={
                    isVoicePlaying ? 'Pausar nota de voz' : 'Ouvir nota de voz'
                  }
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2b1d19]/30 text-[#2b1d19] transition-colors duration-150 hover:bg-[#2b1d19] hover:text-[#f7f1ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2b1d19]"
                >
                  {isVoicePlaying ? (
                    <Pause className="h-3.5 w-3.5" />
                  ) : (
                    <Play className="ml-0.5 h-3.5 w-3.5" />
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-serif-editorial truncate text-base italic text-[#5e4741]">
                      {voiceNoteLabel}
                    </span>
                    <span className="tabular-lining shrink-0 text-[11px] text-[#8d7670]">
                      {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : '--:--'}
                    </span>
                  </div>

                  <div className="relative mt-2 flex h-3 items-center">
                    <div className="h-px w-full bg-[#2b1d19]/18">
                      <div
                        className="h-full bg-[#2b1d19] transition-[width] duration-150"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    {hasVoiceFile && duration > 0 && (
                      <input
                        type="range"
                        min={0}
                        max={duration}
                        step={0.25}
                        value={currentTime}
                        aria-label="Avançar na nota de voz"
                        onChange={(e) => handleSeek(Number(e.target.value))}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                    )}
                  </div>
                </div>
              </div>

              {statusMessage && (
                <p className="mt-2.5 text-xs text-[#5e4741]">{statusMessage}</p>
              )}
            </div>

            <div className="mt-10 space-y-7 font-serif-editorial text-[21px] leading-[1.72] text-[#2b1d19] md:text-[23px]">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={index === 0 ? 'editorial-drop-cap' : undefined}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-14 border-t border-[#2b1d19]/14 pt-8">
              <p className="font-serif-editorial text-xl italic text-[#5e4741]">
                {closing}
              </p>
              <p className="mt-2 font-serif-editorial text-3xl font-normal text-[#2b1d19]">
                {senderName}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
