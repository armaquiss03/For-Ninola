import { KeepsakeConfig } from '../types';

export const HERO_IMAGE_PATH = '/src/assets/images/hero_twilight_bouquet_1795642617553.jpg';

export const DEFAULT_KEEPSAKE: KeepsakeConfig = {
  recipientName: 'Clara',
  senderName: 'Julian',
  targetDateIso: '2026-12-14T00:00',
  heroKicker: 'A Quiet Birthday Keepsake',
  heroHeadline: 'Counting down the days until I get to celebrate you.',
  heroLead:
    'Somewhere between unhurried coffee mornings and walking the long way home, you quietly became my favorite part of the week. Here is a small place held just for your birthday.',
  heroImageUrl: HERO_IMAGE_PATH,
  heroImageCaption:
    'Fig. 01 — Blush ranunculus, sweet peas, and pale delphinium by the south window.',
  countdownTitle: 'Until your day arrives',
  countdownSubtitle: 'Every hour closer feels worth keeping track of.',
  letterSalutation: 'Dear Clara,',
  letterBody: `I spent a long time deciding how to put this together without making a spectacle of it, because everything that feels true between us has always lived in the quieter details.

We do not have a neat label for what this is yet, and honestly I have never felt in a hurry to force one. What I do know is that I notice the way a room changes when you walk into it, how a twenty-minute coffee turns into two hours without either of us checking the time, and how easily I find myself saving small thoughts throughout the day just to tell you later.

As your birthday comes closer, I wanted you to have something unhurried to return to—a small archive of the mornings, twilight walks, and ordinary afternoons that stayed with me long after they ended.

I hope this new year brings you gentle mornings, work that makes you proud, and evenings where you feel completely understood. Whatever comes next for us, I am really glad we are here right now.`,
  letterClosing: 'Always looking forward to next time,',
  memories: [
    {
      id: 'mem-1',
      figureNumber: '01',
      title: 'The Table by the Corner Window',
      category: 'Mornings',
      dateLabel: 'October',
      location: 'Alder Street',
      caption: 'Two cups that went cold while we kept talking past noon.',
      reflection:
        'You arrived ten minutes early with a notebook already open, and somehow we talked about everything from childhood books to where we wanted to travel next spring. Neither of us reached for our phones once.',
      imageUrl: '/src/assets/images/memory_cafe_morning_1795642619334.jpg',
      aspect: 'landscape',
      featured: true,
    },
    {
      id: 'mem-2',
      figureNumber: '02',
      title: 'When the Sky Turned Lavender',
      category: 'Evenings',
      dateLabel: 'Late Autumn',
      location: 'Linden Avenue',
      caption: 'The extra three blocks we walked just because neither of us wanted to head inside.',
      reflection:
        'The streetlamps had just flickered on and the sky held onto that brief wash of rose pink and pale blue between dusk and night. You pointed out how quiet the trees looked after the rain.',
      imageUrl: '/src/assets/images/memory_dusk_walk_1795642618940.jpg',
      aspect: 'portrait',
    },
    {
      id: 'mem-3',
      figureNumber: '03',
      title: 'Late Afternoon by the Water',
      category: 'Quiet Places',
      dateLabel: 'September',
      location: 'North Shore',
      caption: 'Salt air, pastel horizon, and an hour of easy silence.',
      reflection:
        'It was cooler than we expected, so we sat on the low seawall watching the tide shift from powder blue to soft slate. It was the first time silence with someone felt completely effortless.',
      imageUrl: '/src/assets/images/memory_coastal_blue_1795642620302.jpg',
      aspect: 'landscape',
    },
    {
      id: 'mem-4',
      figureNumber: '04',
      title: 'Sunlit Bookshelf & Dried Lavender',
      category: 'Quiet Places',
      dateLabel: 'November',
      location: 'Sunday Afternoon',
      caption: 'Golden window light across cedar shelves and a single pale rose.',
      reflection:
        'You brought over two paperbacks you swore I needed to read and left dried lavender tucked inside the front cover as a bookmark. I still leave it right there on the shelf.',
      imageUrl: '/src/assets/images/memory_vinyl_evening_1795642620698.jpg',
      aspect: 'square',
    },
  ],
};
