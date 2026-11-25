export type MemoryCategory = 'Mornings' | 'Evenings' | 'Quiet Places';

export interface MemoryItem {
  id: string;
  figureNumber: string;
  title: string;
  category: MemoryCategory;
  dateLabel: string;
  location: string;
  caption: string;
  reflection: string;
  imageUrl: string;
  aspect: 'landscape' | 'portrait' | 'square';
  featured?: boolean;
}

export interface KeepsakeConfig {
  recipientName: string;
  senderName: string;
  targetDateIso: string; // e.g., "2026-12-14T00:00"
  heroKicker: string;
  heroHeadline: string;
  heroLead: string;
  heroImageUrl: string;
  heroImageCaption: string;
  countdownTitle: string;
  countdownSubtitle: string;
  letterSalutation: string;
  letterBody: string; // paragraphs separated by double newlines
  letterClosing: string;
  memories: MemoryItem[];
}
