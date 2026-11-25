import { useEffect, useState } from 'react';
import { DEFAULT_KEEPSAKE } from './data/defaultKeepsake';
import { KeepsakeConfig } from './types';
import { ResilientImage } from './components/ResilientImage';
import { CountdownSection } from './components/CountdownSection';
import { MemoriesGallery } from './components/MemoriesGallery';
import { DigitalLetterSection } from './components/DigitalLetterSection';
import { DrawerTab, PersonalizeDrawer } from './components/PersonalizeDrawer';

const STORAGE_KEY = 'between_us_keepsake_v1';

function loadInitialConfig(): KeepsakeConfig {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_KEEPSAKE;
    const parsed = JSON.parse(raw) as Partial<KeepsakeConfig>;
    return {
      ...DEFAULT_KEEPSAKE,
      ...parsed,
      memories: Array.isArray(parsed.memories)
        ? parsed.memories
        : DEFAULT_KEEPSAKE.memories,
    };
  } catch {
    return DEFAULT_KEEPSAKE;
  }
}

export default function App() {
  const [config, setConfig] = useState<KeepsakeConfig>(() => loadInitialConfig());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<DrawerTab>('details');
  const [storageWarning, setStorageWarning] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      setStorageWarning(null);
    } catch {
      setStorageWarning(
        'Storage limit reached for uploaded images. Use fewer or smaller photos to save changes.'
      );
    }
  }, [config]);

  const openDrawerAt = (tab: DrawerTab) => {
    setDrawerTab(tab);
    setDrawerOpen(true);
  };

  const handleReset = () => {
    setConfig(DEFAULT_KEEPSAKE);
    setStorageWarning(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const formattedHeroDate = (() => {
    const date = new Date(config.targetDateIso);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
    }).format(date);
  })();

  return (
    <div className="min-h-screen bg-[#f7f1ed] text-[#2b1d19]">
      {/* Opening Pastel Sky Spread (no sticky SaaS navbar, pure editorial masthead) */}
      <div id="top" className="editorial-pastel-sky">
        <header className="mx-auto flex max-w-[1160px] items-baseline justify-between gap-8 px-6 pt-8 pb-6 md:px-12 md:pt-12">
          <span className="font-serif-editorial whitespace-nowrap shrink-0 text-xl italic text-[#2b1d19]">
            For {config.recipientName || 'You'}
          </span>

          <nav
            aria-label="Page sections"
            className="flex items-center gap-6 text-xs tracking-[0.08em] text-[#5e4741] sm:gap-8"
          >
            <a
              href="#countdown"
              className="whitespace-nowrap shrink-0 border-b border-transparent pb-0.5 transition-colors duration-150 hover:border-[#2b1d19]/50 hover:text-[#2b1d19]"
            >
              Countdown
            </a>
            <a
              href="#memories"
              className="whitespace-nowrap shrink-0 border-b border-transparent pb-0.5 transition-colors duration-150 hover:border-[#2b1d19]/50 hover:text-[#2b1d19]"
            >
              Memories
            </a>
            <a
              href="#letter"
              className="whitespace-nowrap shrink-0 border-b border-transparent pb-0.5 transition-colors duration-150 hover:border-[#2b1d19]/50 hover:text-[#2b1d19]"
            >
              Letter
            </a>
          </nav>
        </header>

        <main>
          <section className="mx-auto grid max-w-[1160px] grid-cols-1 items-end gap-12 px-6 pt-8 pb-20 md:px-12 md:pt-14 md:pb-28 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-8 lg:col-span-6 lg:pb-6">
              {formattedHeroDate && (
                <p className="text-xs tracking-[0.14em] text-[#5e4741]">
                  {formattedHeroDate}
                </p>
              )}

              <h1
                className="font-serif-editorial text-[clamp(2.75rem,5vw,4.5rem)] font-normal leading-[1.03] tracking-tight text-[#2b1d19]"
                style={{ textWrap: 'balance' }}
              >
                {config.heroHeadline}
              </h1>

              <p className="max-w-md text-[15px] leading-[1.8] text-[#5e4741]">
                {config.heroLead}
              </p>

              <div className="pt-2">
                <a
                  href="#letter"
                  className="inline-block border-b border-[#2b1d19]/45 pb-1 font-serif-editorial text-lg italic text-[#2b1d19] transition-colors duration-150 hover:border-[#2b1d19]"
                >
                  Read the letter below
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-[2px]">
                <ResilientImage
                  src={config.heroImageUrl}
                  alt={config.heroImageCaption}
                  fallbackTitle={`For ${config.recipientName}`}
                  className="h-full w-full"
                />
              </div>
              <p className="mt-3 font-serif-editorial text-sm italic text-[#5e4741]">
                {config.heroImageCaption}
              </p>
            </div>
          </section>
        </main>
      </div>

      <CountdownSection
        recipientName={config.recipientName}
        targetDateIso={config.targetDateIso}
        title={config.countdownTitle}
      />

      <MemoriesGallery memories={config.memories} />

      <DigitalLetterSection
        senderName={config.senderName}
        salutation={config.letterSalutation}
        body={config.letterBody}
        closing={config.letterClosing}
      />

      {/* Rich warm espresso brown closing band */}
      <footer className="bg-[#2b1d19] px-6 py-16 text-[#f5ede8] md:px-12">
        <div className="mx-auto flex max-w-[1160px] flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="font-serif-editorial text-lg italic text-[#ead9d2]">
            For {config.recipientName}, from {config.senderName}
          </p>

          <div className="flex items-center gap-8 text-xs tracking-[0.06em] text-[#cdb8b0]">
            <a
              href="#top"
              className="transition-colors duration-150 hover:text-[#f5ede8]"
            >
              Back to top
            </a>
            <button
              type="button"
              onClick={() => openDrawerAt('details')}
              className="transition-colors duration-150 hover:text-[#f5ede8]"
            >
              Customize
            </button>
          </div>
        </div>
      </footer>

      <PersonalizeDrawer
        isOpen={drawerOpen}
        initialTab={drawerTab}
        config={config}
        storageWarning={storageWarning}
        onClose={() => setDrawerOpen(false)}
        onChange={setConfig}
        onReset={handleReset}
      />
    </div>
  );
}
