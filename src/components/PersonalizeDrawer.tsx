import { ChangeEvent, useEffect, useState } from 'react';
import { Plus, RotateCcw, Trash2, Upload, X } from 'lucide-react';
import { KeepsakeConfig, MemoryCategory, MemoryItem } from '../types';

export type DrawerTab = 'details' | 'letter' | 'memories';

interface PersonalizeDrawerProps {
  isOpen: boolean;
  initialTab: DrawerTab;
  config: KeepsakeConfig;
  storageWarning: string | null;
  onClose: () => void;
  onChange: (next: KeepsakeConfig) => void;
  onReset: () => void;
}

const CATEGORIES: MemoryCategory[] = ['Mornings', 'Evenings', 'Quiet Places'];

function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 1200;
        const scale = img.width > maxWidth ? maxWidth / img.width : 1;
        const width = Math.round(img.width * scale);
        const height = Math.round(img.height * scale);

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not initialize image canvas'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = () => reject(new Error('Invalid image file'));
      img.src = String(reader.result);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export function PersonalizeDrawer({
  isOpen,
  initialTab,
  config,
  storageWarning,
  onClose,
  onChange,
  onReset,
}: PersonalizeDrawerProps) {
  const [activeTab, setActiveTab] = useState<DrawerTab>(initialTab);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setUploadError(null);
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const updateField = <K extends keyof KeepsakeConfig>(
    key: K,
    value: KeepsakeConfig[K]
  ) => {
    onChange({ ...config, [key]: value });
  };

  const handleHeroUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setUploadError(null);
      const dataUrl = await compressImageFile(file);
      updateField('heroImageUrl', dataUrl);
    } catch {
      setUploadError('Could not process that image. Please choose a valid photo file.');
    }
  };

  const handleMemoryUpload = async (
    id: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setUploadError(null);
      const dataUrl = await compressImageFile(file);
      updateMemory(id, { imageUrl: dataUrl });
    } catch {
      setUploadError('Could not process that image. Please choose a valid photo file.');
    }
  };

  const updateMemory = (id: string, patch: Partial<MemoryItem>) => {
    onChange({
      ...config,
      memories: config.memories.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    });
  };

  const handleAddMemory = () => {
    const nextNum = String(config.memories.length + 1).padStart(2, '0');
    const newItem: MemoryItem = {
      id: `mem-${Date.now()}`,
      figureNumber: nextNum,
      title: 'A New Shared Moment',
      category: 'Evenings',
      dateLabel: 'Recently',
      location: 'Favorite Spot',
      caption: 'A short line about why this moment stayed with you.',
      reflection:
        'Write a longer note here about the conversation, the light, or what made that day feel unforgettable.',
      imageUrl: '/src/assets/images/memory_dusk_walk_1795642618940.jpg',
      aspect: 'landscape',
    };
    onChange({ ...config, memories: [...config.memories, newItem] });
  };

  const handleDeleteMemory = (id: string) => {
    const remaining = config.memories
      .filter((item) => item.id !== id)
      .map((item, idx) => ({
        ...item,
        figureNumber: String(idx + 1).padStart(2, '0'),
      }));
    onChange({ ...config, memories: remaining });
  };

  const inputBaseClass =
    'w-full rounded-lg border border-[#2e201d]/15 bg-[#fffdfc] px-3.5 py-2.5 text-sm text-[#2e201d] placeholder:text-[#8a7570] focus:border-[#2e201d] focus:outline-none';
  const labelBaseClass = 'block text-xs font-medium text-[#614d49] mb-1.5';

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#2e201d]/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      onClick={onClose}
    >
      <aside
        className="flex h-full w-full max-w-xl flex-col border-l border-[#2e201d]/12 bg-[#faf7f5] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#2e201d]/10 px-6 py-5">
          <div>
            <h2
              id="drawer-title"
              className="font-serif-editorial text-2xl font-normal text-[#2e201d]"
            >
              Personalize Keepsake
            </h2>
            <p className="text-xs text-[#8a7570]">
              Changes save automatically in your browser.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close personalize panel"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2e201d]/15 text-[#2e201d] transition-colors duration-150 hover:bg-[#2e201d] hover:text-[#faf7f5]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 border-b border-[#2e201d]/10 px-6 py-3">
          {(
            [
              { id: 'details', label: 'Details & Date' },
              { id: 'memories', label: 'Memories' },
              { id: 'letter', label: 'Letter' },
            ] as const
          ).map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap shrink-0 rounded-md px-3.5 py-2 text-xs font-medium transition-colors duration-150 ${
                  active
                    ? 'bg-[#2e201d] text-[#faf7f5]'
                    : 'text-[#614d49] hover:text-[#2e201d]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {(uploadError || storageWarning) && (
          <div className="mx-6 mt-4 rounded-lg border border-[#2e201d]/20 bg-[#f4d9e2]/45 px-4 py-2.5 text-xs text-[#2e201d]">
            {uploadError || storageWarning}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="recipient-name" className={labelBaseClass}>
                    Her Name
                  </label>
                  <input
                    id="recipient-name"
                    type="text"
                    value={config.recipientName}
                    onChange={(e) => updateField('recipientName', e.target.value)}
                    className={inputBaseClass}
                  />
                </div>
                <div>
                  <label htmlFor="sender-name" className={labelBaseClass}>
                    Your Name
                  </label>
                  <input
                    id="sender-name"
                    type="text"
                    value={config.senderName}
                    onChange={(e) => updateField('senderName', e.target.value)}
                    className={inputBaseClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="target-date" className={labelBaseClass}>
                  Birthday Date & Time
                </label>
                <input
                  id="target-date"
                  type="datetime-local"
                  value={config.targetDateIso}
                  onChange={(e) => updateField('targetDateIso', e.target.value)}
                  className={inputBaseClass}
                />
              </div>

              <div>
                <label htmlFor="hero-headline" className={labelBaseClass}>
                  Opening Headline
                </label>
                <input
                  id="hero-headline"
                  type="text"
                  value={config.heroHeadline}
                  onChange={(e) => updateField('heroHeadline', e.target.value)}
                  className={inputBaseClass}
                />
              </div>

              <div>
                <label htmlFor="hero-lead" className={labelBaseClass}>
                  Opening Note
                </label>
                <textarea
                  id="hero-lead"
                  rows={3}
                  value={config.heroLead}
                  onChange={(e) => updateField('heroLead', e.target.value)}
                  className={inputBaseClass}
                />
              </div>

              <div className="border-t border-[#2e201d]/10 pt-5">
                <span className={labelBaseClass}>Hero Photograph</span>
                <div className="flex items-center gap-4">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#2e201d]/20 bg-[#fffdfc] px-4 py-2 text-xs font-medium text-[#2e201d] transition-colors duration-150 hover:bg-[#2e201d] hover:text-[#faf7f5]">
                    <Upload className="h-3.5 w-3.5" />
                    <span>Upload photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleHeroUpload}
                      className="sr-only"
                    />
                  </label>
                  <span className="text-xs text-[#8a7570]">
                    Portrait 3:4 works best
                  </span>
                </div>
                <div className="mt-3">
                  <label htmlFor="hero-caption" className={labelBaseClass}>
                    Photo Caption
                  </label>
                  <input
                    id="hero-caption"
                    type="text"
                    value={config.heroImageCaption}
                    onChange={(e) => updateField('heroImageCaption', e.target.value)}
                    className={inputBaseClass}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'letter' && (
            <div className="space-y-5">
              <div>
                <label htmlFor="letter-salutation" className={labelBaseClass}>
                  Salutation
                </label>
                <input
                  id="letter-salutation"
                  type="text"
                  value={config.letterSalutation}
                  onChange={(e) => updateField('letterSalutation', e.target.value)}
                  className={inputBaseClass}
                />
              </div>

              <div>
                <label htmlFor="letter-body" className={labelBaseClass}>
                  Letter Body (separate paragraphs with an empty line)
                </label>
                <textarea
                  id="letter-body"
                  rows={12}
                  value={config.letterBody}
                  onChange={(e) => updateField('letterBody', e.target.value)}
                  className={`${inputBaseClass} leading-relaxed`}
                />
              </div>

              <div>
                <label htmlFor="letter-closing" className={labelBaseClass}>
                  Closing Line
                </label>
                <input
                  id="letter-closing"
                  type="text"
                  value={config.letterClosing}
                  onChange={(e) => updateField('letterClosing', e.target.value)}
                  className={inputBaseClass}
                />
              </div>
            </div>
          )}

          {activeTab === 'memories' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#614d49]">
                  Edit captions, upload your own photos, or add another memory.
                </p>
                <button
                  type="button"
                  onClick={handleAddMemory}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#2e201d] px-3.5 py-2 text-xs font-medium text-[#faf7f5] transition-opacity duration-150 hover:opacity-90"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add memory</span>
                </button>
              </div>

              <div className="space-y-6">
                {config.memories.map((memory) => (
                  <div
                    key={memory.id}
                    className="space-y-4 rounded-xl border border-[#2e201d]/12 bg-[#fffdfc] p-5"
                  >
                    <div className="flex items-center justify-between border-b border-[#2e201d]/10 pb-3">
                      <span className="tabular-lining text-xs font-medium text-[#614d49]">
                        Memory {memory.figureNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteMemory(memory.id)}
                        aria-label={`Remove memory ${memory.title}`}
                        className="inline-flex items-center gap-1 text-xs text-[#8a7570] transition-colors hover:text-[#2e201d]"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className={labelBaseClass}>Title</label>
                        <input
                          type="text"
                          value={memory.title}
                          onChange={(e) =>
                            updateMemory(memory.id, { title: e.target.value })
                          }
                          className={inputBaseClass}
                        />
                      </div>
                      <div>
                        <label className={labelBaseClass}>Chapter</label>
                        <select
                          value={memory.category}
                          onChange={(e) =>
                            updateMemory(memory.id, {
                              category: e.target.value as MemoryCategory,
                            })
                          }
                          className={inputBaseClass}
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className={labelBaseClass}>Date / Season</label>
                        <input
                          type="text"
                          value={memory.dateLabel}
                          onChange={(e) =>
                            updateMemory(memory.id, { dateLabel: e.target.value })
                          }
                          className={inputBaseClass}
                        />
                      </div>
                      <div>
                        <label className={labelBaseClass}>Place</label>
                        <input
                          type="text"
                          value={memory.location}
                          onChange={(e) =>
                            updateMemory(memory.id, { location: e.target.value })
                          }
                          className={inputBaseClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelBaseClass}>Short Caption</label>
                      <input
                        type="text"
                        value={memory.caption}
                        onChange={(e) =>
                          updateMemory(memory.id, { caption: e.target.value })
                        }
                        className={inputBaseClass}
                      />
                    </div>

                    <div>
                      <label className={labelBaseClass}>Full Memory Note</label>
                      <textarea
                        rows={3}
                        value={memory.reflection}
                        onChange={(e) =>
                          updateMemory(memory.id, { reflection: e.target.value })
                        }
                        className={inputBaseClass}
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#2e201d]/15 px-3.5 py-2 text-xs font-medium text-[#2e201d] transition-colors duration-150 hover:bg-[#2e201d] hover:text-[#faf7f5]">
                        <Upload className="h-3.5 w-3.5" />
                        <span>Replace photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleMemoryUpload(memory.id, e)}
                          className="sr-only"
                        />
                      </label>

                      <select
                        aria-label="Aspect ratio"
                        value={memory.aspect}
                        onChange={(e) =>
                          updateMemory(memory.id, {
                            aspect: e.target.value as MemoryItem['aspect'],
                          })
                        }
                        className="rounded-lg border border-[#2e201d]/15 bg-[#fffdfc] px-3 py-2 text-xs text-[#614d49]"
                      >
                        <option value="landscape">Landscape (4:3)</option>
                        <option value="portrait">Portrait (3:4)</option>
                        <option value="square">Square (1:1)</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[#2e201d]/10 px-6 py-4">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#614d49] transition-colors hover:text-[#2e201d]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset defaults</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#2e201d] px-5 py-2.5 text-xs font-medium text-[#faf7f5] transition-opacity duration-150 hover:opacity-90"
          >
            Done
          </button>
        </div>
      </aside>
    </div>
  );
}
