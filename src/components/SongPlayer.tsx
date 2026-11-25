import { useEffect, useId, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

interface SongPlayerProps {
  title: string;
  artist: string;
  youtubeId: string;
  songPath: string;
  isPlaying: boolean;
  onPlayStateChange: (playing: boolean) => void;
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
}

interface YTNamespace {
  Player: new (
    elementId: string,
    options: {
      videoId: string;
      width?: string | number;
      height?: string | number;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: () => void;
        onStateChange?: (event: { data: number }) => void;
        onError?: () => void;
      };
    }
  ) => YTPlayerInstance;
  PlayerState?: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
  };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let ytApiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT && window.YT.Player) {
    return Promise.resolve(window.YT);
  }
  if (ytApiPromise) {
    return ytApiPromise;
  }

  ytApiPromise = new Promise((resolve, reject) => {
    const existingPrev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (existingPrev) existingPrev();
      if (window.YT) {
        resolve(window.YT);
      } else {
        reject(new Error('YouTube API unavailable'));
      }
    };

    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    );
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.onerror = () => reject(new Error('Failed to load YouTube script'));
      document.head.appendChild(script);
    }
  });

  return ytApiPromise;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export function SongPlayer({
  title,
  artist,
  youtubeId,
  songPath,
  isPlaying,
  onPlayStateChange,
}: SongPlayerProps) {
  const playerContainerId = useId().replace(/:/g, '_');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ytPlayerRef = useRef<YTPlayerInstance | null>(null);
  const ytReadyRef = useRef(false);
  const pendingPlayRef = useRef(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ytFailed, setYtFailed] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const hasLocalFile = Boolean(songPath.trim());
  const useYoutube = !hasLocalFile && Boolean(youtubeId.trim());

  // Local MP3/audio playback
  useEffect(() => {
    const audio = audioRef.current;
    if (!hasLocalFile || !audio) return;

    if (isPlaying) {
      setStatusMessage(null);
      const playPromise = audio.play();
      if (playPromise) {
        playPromise.catch(() => {
          onPlayStateChange(false);
          setStatusMessage('Não foi possível reproduzir este ficheiro de áudio.');
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, hasLocalFile, songPath, onPlayStateChange]);

  // YouTube IFrame Player initialization
  useEffect(() => {
    if (!useYoutube) return;

    let cancelled = false;
    ytReadyRef.current = false;

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled) return;
        ytPlayerRef.current = new YT.Player(playerContainerId, {
          videoId: youtubeId,
          width: 200,
          height: 200,
          playerVars: {
            autoplay: 0,
            controls: 0,
            loop: 1,
            playlist: youtubeId,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: () => {
              if (cancelled) return;
              ytReadyRef.current = true;
              const d = ytPlayerRef.current?.getDuration() ?? 0;
              if (d > 0) setDuration(d);
              if (pendingPlayRef.current) {
                ytPlayerRef.current?.playVideo();
                pendingPlayRef.current = false;
              }
            },
            onStateChange: (event) => {
              if (cancelled) return;
              const d = ytPlayerRef.current?.getDuration() ?? 0;
              if (d > 0) setDuration(d);
              // YT.PlayerState: PLAYING = 1, PAUSED = 2, ENDED = 0
              if (event.data === 1) {
                onPlayStateChange(true);
              } else if (event.data === 2 || event.data === 0) {
                onPlayStateChange(false);
              }
            },
            onError: () => {
              if (cancelled) return;
              setYtFailed(true);
              onPlayStateChange(false);
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) {
          setYtFailed(true);
        }
      });

    return () => {
      cancelled = true;
      ytReadyRef.current = false;
      ytPlayerRef.current?.destroy();
      ytPlayerRef.current = null;
    };
  }, [useYoutube, youtubeId, playerContainerId, onPlayStateChange]);

  // Sync YouTube play/pause when isPlaying prop changes externally (e.g. voice note started)
  useEffect(() => {
    if (!useYoutube) return;
    if (!ytReadyRef.current || !ytPlayerRef.current) {
      pendingPlayRef.current = isPlaying;
      return;
    }

    if (isPlaying) {
      ytPlayerRef.current.playVideo();
    } else {
      ytPlayerRef.current.pauseVideo();
    }
  }, [isPlaying, useYoutube]);

  // Poll YouTube progress while playing
  useEffect(() => {
    if (!useYoutube || !isPlaying) return;
    const timer = window.setInterval(() => {
      if (!ytPlayerRef.current || !ytReadyRef.current) return;
      const t = ytPlayerRef.current.getCurrentTime();
      const d = ytPlayerRef.current.getDuration();
      if (Number.isFinite(t)) setCurrentTime(t);
      if (Number.isFinite(d) && d > 0) setDuration(d);
    }, 500);
    return () => window.clearInterval(timer);
  }, [useYoutube, isPlaying]);

  const progressPercent =
    duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const handleToggle = () => {
    if (!hasLocalFile && !useYoutube) {
      setStatusMessage('Adiciona o caminho da música em src/data/keepsake.ts.');
      return;
    }

    setStatusMessage(null);
    const nextPlaying = !isPlaying;

    if (useYoutube && ytReadyRef.current && ytPlayerRef.current) {
      if (nextPlaying) {
        ytPlayerRef.current.playVideo();
      } else {
        ytPlayerRef.current.pauseVideo();
      }
    } else if (useYoutube) {
      pendingPlayRef.current = nextPlaying;
    }

    onPlayStateChange(nextPlaying);
  };

  const handleSeek = (nextValue: number) => {
    setCurrentTime(nextValue);
    if (hasLocalFile && audioRef.current) {
      audioRef.current.currentTime = nextValue;
    } else if (useYoutube && ytReadyRef.current && ytPlayerRef.current) {
      ytPlayerRef.current.seekTo(nextValue, true);
    }
  };

  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${youtubeId}`;

  return (
    <div className="border-t border-[#2b1d19]/15 pt-5">
      {hasLocalFile && (
        <audio
          ref={audioRef}
          src={songPath}
          preload="metadata"
          loop
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onEnded={() => onPlayStateChange(false)}
          onError={() => {
            onPlayStateChange(false);
            setStatusMessage('Ficheiro de áudio não encontrado em src/data/keepsake.ts.');
          }}
        />
      )}

      {useYoutube && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed -left-[9999px] top-0 h-[200px] w-[200px] opacity-0"
        >
          <div id={playerContainerId} />
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleToggle}
          aria-label={isPlaying ? `Pausar ${title}` : `Tocar ${title}`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2b1d19]/30 text-[#2b1d19] transition-colors duration-150 hover:bg-[#2b1d19] hover:text-[#f7f1ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2b1d19]"
        >
          {isPlaying ? (
            <Pause className="h-3.5 w-3.5" />
          ) : (
            <Play className="ml-0.5 h-3.5 w-3.5" />
          )}
        </button>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-baseline justify-between gap-4">
            <p className="truncate text-sm text-[#2b1d19]">
              <span className="font-serif-editorial text-lg italic">{title}</span>
              {artist && (
                <span className="ml-2 text-xs text-[#5e4741]">
                  — {artist}
                </span>
              )}
            </p>
            <span className="tabular-lining shrink-0 text-[11px] text-[#8d7670]">
              {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : '--:--'}
            </span>
          </div>

          <div className="relative flex h-3 items-center">
            <div className="h-px w-full bg-[#2b1d19]/18">
              <div
                className="h-full bg-[#2b1d19] transition-[width] duration-150"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {duration > 0 && (
              <input
                type="range"
                min={0}
                max={duration}
                step={0.5}
                value={currentTime}
                aria-label="Avançar na música"
                onChange={(e) => handleSeek(Number(e.target.value))}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            )}
          </div>
        </div>
      </div>

      {ytFailed && (
        <p className="mt-2.5 text-xs text-[#5e4741]">
          O leitor incorporado não pôde carregar aqui.{' '}
          <a
            href={youtubeWatchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[#2b1d19]"
          >
            Ouvir no YouTube
          </a>
          .
        </p>
      )}

      {statusMessage && (
        <p className="mt-2.5 text-xs text-[#5e4741]">{statusMessage}</p>
      )}
    </div>
  );
}
