export interface PhotoSlot {
  id: string;
  numberLabel: string;
  title: string;
  caption: string;
  imageUrl: string;
}

export interface FeaturedPhoto {
  title: string;
  dateLabel: string;
  location: string;
  caption: string;
  reflection: string;
  imageUrl: string;
}

export interface DailyRevealItem {
  id: string;
  unlockDate: string; // YYYY-MM-DD na hora local
  dateLabel: string;
  bookTitle: string;
  bookAuthor: string;
  title: string;
  note: string;
}

export interface KeepsakeData {
  recipientName: string;
  senderName: string;
  birthdayIso: string;
  birthdayDateKey: string; // YYYY-MM-DD
  previewBirthdayMode: boolean;
  heroHeadline: string;
  heroLead: string;
  heroImageUrl: string;
  heroImageCaption: string;
  countdownTitle: string;
  songTitle: string;
  songArtist: string;
  songYoutubeId: string;
  songPath: string;
  voiceNoteLabel: string;
  voiceNotePath: string;
  letterSalutation: string;
  letterBody: string;
  letterClosing: string;
  dailyReveals: DailyRevealItem[];
  featuredPhoto: FeaturedPhoto;
  slideshowPhotos: PhotoSlot[];
}
