import { KeepsakeData } from '../types';

// ============================================================================
// CONFIGURAÇÃO DO SITE — EDITA TUDO AQUI NO VS CODE
// 1. Coloca os teus ficheiros na pasta `public/` (ex: `public/audio/` e `public/fotos/`).
// 2. Cola os caminhos abaixo (ex: '/audio/nota-de-voz.mp3' ou '/fotos/ninola-1.jpg').
// ============================================================================

// COLA AQUI O CAMINHO DA TUA NOTA DE VOZ A LER A CARTA (ex: '/audio/nota-de-voz.mp3'):
const VOICE_NOTE_PATH = '';

// OPCIONAL: Se preferires um MP3 local em vez do YouTube para a música, cola aqui:
const LOCAL_SONG_PATH = '';

// ID do YouTube para "Heaven Baby" — Ayra Starr:
const SONG_YOUTUBE_ID = '2ZTcvsdMR1c';

// Muda para `true` apenas se quiseres pré-visualizar todas as notas e a carta
// antes do dia 4 de dezembro. Volta a colocar `false` antes de enviar para a Ninola.
const PREVIEW_BIRTHDAY_MODE = false;

export const KEEPSAKE: KeepsakeData = {
  recipientName: 'Ninola',
  senderName: 'Agui',
  birthdayIso: '2026-12-04T00:00:00',
  birthdayDateKey: '2026-12-04',
  previewBirthdayMode: PREVIEW_BIRTHDAY_MODE,

  // TEXTO DE ABERTURA (podes editar à vontade)
  heroHeadline: 'A contar os dias até ao teu quatro de dezembro.',
  heroLead:
    'Ainda não nos vimos pessoalmente e não temos fotografias juntos — mas entre mensagens demoradas e chamadas sem hora para acabar, tornaste-te a minha pessoa favorita para esperar. A cada dia até ao teu aniversário abre-se aqui uma nota sobre os livros que amas; no dia quatro, abre-se a carta.',

  // COLA AQUI O CAMINHO DA FOTO PRINCIPAL DE ABERTURA DA NINOLA (ex: '/fotos/ninola-capa.jpg'):
  heroImageUrl: '',
  heroImageCaption: 'Ninola — 4 de Dezembro.',

  countdownTitle: 'Até chegar o teu dia, Ninola',

  songTitle: 'Heaven Baby',
  songArtist: 'Ayra Starr',
  songYoutubeId: SONG_YOUTUBE_ID,
  songPath: LOCAL_SONG_PATH,

  voiceNoteLabel: 'Nota de voz a ler esta carta',
  voiceNotePath: VOICE_NOTE_PATH,

  // CARTA DE ANIVERSÁRIO (desbloqueada apenas no dia 4 de dezembro — edita aqui):
  letterSalutation: 'Querida Ninola,',
  letterBody: `Passei bastante tempo a pensar em como juntar tudo isto sem exageros, porque o que nasceu entre nós sempre viveu na leveza e na verdade.

Nunca nos encontrámos pessoalmente, não temos fotos lado a lado, e também ainda não demos um rótulo fechado ao que estamos a construir. Mesmo assim, é curioso como conseguiste ocupar um lugar tão claro nos meus dias — na forma como espero pelas tuas mensagens, no cuidado com que reparo no que dizes e na calma que sinto sempre que estamos a falar.

Ao longo destes dias fui deixando aqui pequenas notas ligadas aos livros que tanto gostas — sobre amor, amizade, companhia e cumplicidade — porque conhecer as histórias que carregas foi a forma mais bonita de me sentir perto de ti mesmo antes do nosso primeiro abraço.

Desejo que este novo ano de vida te traga manhãs tranquilas, sonhos protegidos e a certeza de que és muito querida. Mal posso esperar pelo dia em que a distância dê lugar ao nosso primeiro encontro de verdade.`,
  letterClosing: 'Com carinho, amizade e à espera do nosso dia,',

  // 8 LIVROS FAVORITOS — 1 NOTA POR DIA DE 26 DE NOVEMBRO A 3 DE DEZEMBRO
  dailyReveals: [
    {
      id: 'day-1',
      unlockDate: '2026-11-26',
      dateLabel: '26 de Novembro',
      bookTitle: 'Cruzando o Caminho do Sol',
      bookAuthor: 'Corban Addison',
      title: 'Companhia que atravessa qualquer distância',
      note: 'Em "Cruzando o Caminho do Sol", Ahalya e Sita sobrevivem ao impossível porque nunca largam a mão uma da outra, enquanto Thomas Clarke atravessa oceanos até à Índia tentando reencontrar Priya e devolver sentido ao que parecia perdido. O que mais me toca nessa história é a ideia de que a distância geográfica não diminui a presença verdadeira. Mesmo antes de nos sentarmos no mesmo lugar, tu já fazes companhia aos meus dias de uma forma rara — daquelas presenças que atravessam qualquer quilómetro.',
    },
    {
      id: 'day-2',
      unlockDate: '2026-11-27',
      dateLabel: '27 de Novembro',
      bookTitle: 'Torto Arado',
      bookAuthor: 'Itamar Vieira Junior',
      title: 'Cumplicidade que não precisa de barulho',
      note: 'Em "Torto Arado", depois do acidente com a antiga faca de prata da avó Donana em Água Negra, Bibiana e Belonísia ficam ligadas por uma cumplicidade tão funda que Bibiana passa a ser a voz da irmã. É uma das demonstrações mais bonitas da literatura sobre entender alguém no silêncio. Contigo sinto essa mesma tranquilidade: a amizade de poder falar de tudo, mas também o conforto de estar em silêncio contigo sem que nada pareça vazio.',
    },
    {
      id: 'day-3',
      unlockDate: '2026-11-28',
      dateLabel: '28 de Novembro',
      bookTitle: 'Todas as Tuas Imperfeições',
      bookAuthor: 'Colleen Hoover',
      title: 'Amor pelos dias reais, não pelos perfeitos',
      note: 'Quinn e Graham conhecem-se no pior dia das suas vidas, e ao longo do livro descobrem que o amor não se sustenta só quando a caixa de promessas está cheia de momentos fáceis — ele prova-se quando escolhemos ficar mesmo nos dias difíceis e imperfeitos. É assim que gosto de pensar em nós: sem idealizações, sem pressa, apenas a vontade sincera de conhecer os teus dias claros e os teus dias cansados, e continuar aqui.',
    },
    {
      id: 'day-4',
      unlockDate: '2026-11-29',
      dateLabel: '29 de Novembro',
      bookTitle: 'Uma Segunda Chance',
      bookAuthor: 'Colleen Hoover',
      title: 'Amizade e cuidado onde há paciência',
      note: 'Na história de Kenna e Ledger, tudo começa num cenário difícil, cheio de julgamentos e feridas abertas. O que muda tudo entre eles não é um gesto grandioso, mas a paciência de Ledger em ouvir sem condenar e a coragem de Kenna em não desistir do que ama. Admiro em ti exactamente essa capacidade de acolher e ouvir. Antes de qualquer título, o que temos tem uma base de amizade e respeito que faz tudo parecer seguro.',
    },
    {
      id: 'day-5',
      unlockDate: '2026-11-30',
      dateLabel: '30 de Novembro',
      bookTitle: 'Não Minta',
      bookAuthor: 'Freida McFadden',
      title: 'Cumplicidade sem máscaras nem segredos',
      note: 'Enquanto Tricia e Ethan ficam presos na mansão isolada da Dra. Adrienne Hale e cada fita escondida revela uma mentira nova, o que mais valorizo entre nós é o oposto exacto desse suspense: a transparência. Contigo não há jogos de quem sente menos, nem portas fechadas. Há cumplicidade suficiente para eu admitir sem rodeios o quanto gosto de conversar contigo todos os dias.',
    },
    {
      id: 'day-6',
      unlockDate: '2026-12-01',
      dateLabel: '1 de Dezembro',
      bookTitle: 'Tala Mungongo',
      bookAuthor: 'Filipe Correia de Sá',
      title: 'Memória, raízes e o valor de quem és',
      note: 'No reino do Grande Quimbo, quando todos perdem o seu "passado", o protagonista Estamos Juntos parte numa travessia pelo vento e pelas águas — acompanhado pelo génio Ninguém e por Cara Podre — para recuperar o que herdou do avô e merecer a mão de Makémaka. A força do romance angolano está em lembrar que a nossa essência é sagrada. E cada conversa contigo mostra-me o quanto és autêntica, cheia de identidade e impossível de esquecer.',
    },
    {
      id: 'day-7',
      unlockDate: '2026-12-02',
      dateLabel: '2 de Dezembro',
      bookTitle: 'Uma Oração de Amor',
      bookAuthor: 'Lyta Racielly',
      title: 'Amor com intenção e propósito',
      note: 'Marta escrevia cartas em segredo para o homem que Deus reservava para ela, até perceber que os planos mais bonitos acontecem quando o coração reconhece cuidado verdadeiro em alguém como Gabriel. Há algo de muito bonito nessa espera respeitosa: não precisamos de apressar o que somos, porque a forma como te cuido em pensamento, oração e companhia já diz tudo o que sinto por ti.',
    },
    {
      id: 'day-8',
      unlockDate: '2026-12-03',
      dateLabel: '3 de Dezembro',
      bookTitle: 'Assassinos de Sonhos e Propósitos',
      bookAuthor: 'Amaro Hombo',
      title: 'Véspera: proteger os teus sonhos juntos',
      note: 'Na véspera do teu aniversário, lembrei-me do livro de Amaro Hombo sobre tudo aquilo que tenta travar o propósito de alguém. A verdadeira amizade, a cumplicidade e o amor nunca prendem nem diminuem — eles protegem os sonhos do outro e dão abrigo para crescer. É exactamente esse lugar que quero ocupar na tua vida. Amanhã, dia 4 de dezembro, a carta abaixo abre-se para ti.',
    },
  ],

  // FOTO PRINCIPAL DA GALERIA: "COMPANHIA SEM DISTÂNCIA"
  // Cola aqui o caminho da foto principal em `imageUrl` (ex: '/fotos/ninola-principal.jpg'):
  featuredPhoto: {
    title: 'Companhia Sem Distância',
    dateLabel: 'Retrato Principal',
    location: 'Entre Nós',
    caption:
      'Nunca estivemos no mesmo sítio ao mesmo tempo, mas nunca houve silêncio difícil entre nós.',
    reflection:
      'A distância física só tem mostrado o quanto é natural gostar de ti — com amizade, calma e cumplicidade.',
    imageUrl: '', // COLA AQUI O CAMINHO DA FOTO PRINCIPAL "COMPANHIA SEM DISTÂNCIA"
  },

  // CARD COM 9 FOTOS DA NINOLA (passam automaticamente com transição suave)
  // Cola o caminho de cada uma das 9 fotos em `imageUrl` pelo VS Code (ex: '/fotos/ninola-1.jpg'):
  slideshowPhotos: [
    {
      id: 'slide-1',
      numberLabel: '01 / 09',
      title: 'Ninola · 01',
      caption: 'Um detalhe teu que fica fácil de guardar.',
      imageUrl: '', // COLA AQUI O CAMINHO DA FOTO 1 DE 9 (ex: '/fotos/ninola-1.jpg')
    },
    {
      id: 'slide-2',
      numberLabel: '02 / 09',
      title: 'Ninola · 02',
      caption: 'A leveza com que iluminas um dia comum.',
      imageUrl: '', // COLA AQUI O CAMINHO DA FOTO 2 DE 9 (ex: '/fotos/ninola-2.jpg')
    },
    {
      id: 'slide-3',
      numberLabel: '03 / 09',
      title: 'Ninola · 03',
      caption: 'Entre conversas longas e sorrisos tranquilos.',
      imageUrl: '', // COLA AQUI O CAMINHO DA FOTO 3 DE 9 (ex: '/fotos/ninola-3.jpg')
    },
    {
      id: 'slide-4',
      numberLabel: '04 / 09',
      title: 'Ninola · 04',
      caption: 'Presença que atravessa qualquer quilómetro.',
      imageUrl: '', // COLA AQUI O CAMINHO DA FOTO 4 DE 9 (ex: '/fotos/ninola-4.jpg')
    },
    {
      id: 'slide-5',
      numberLabel: '05 / 09',
      title: 'Ninola · 05',
      caption: 'Amizade e cumplicidade em cada detalhe.',
      imageUrl: '', // COLA AQUI O CAMINHO DA FOTO 5 DE 9 (ex: '/fotos/ninola-5.jpg')
    },
    {
      id: 'slide-6',
      numberLabel: '06 / 09',
      title: 'Ninola · 06',
      caption: 'O encanto silencioso de quem tu és.',
      imageUrl: '', // COLA AQUI O CAMINHO DA FOTO 6 DE 9 (ex: '/fotos/ninola-6.jpg')
    },
    {
      id: 'slide-7',
      numberLabel: '07 / 09',
      title: 'Ninola · 07',
      caption: 'Para olhar sem pressa enquanto o dia passa.',
      imageUrl: '', // COLA AQUI O CAMINHO DA FOTO 7 DE 9 (ex: '/fotos/ninola-7.jpg')
    },
    {
      id: 'slide-8',
      numberLabel: '08 / 09',
      title: 'Ninola · 08',
      caption: 'Cada pequena pausa traz o teu nome ao pensamento.',
      imageUrl: '', // COLA AQUI O CAMINHO DA FOTO 8 DE 9 (ex: '/fotos/ninola-8.jpg')
    },
    {
      id: 'slide-9',
      numberLabel: '09 / 09',
      title: 'Ninola · 09',
      caption: 'À espera do dia em que estas fotos ganhem a nossa história ao vivo.',
      imageUrl: '', // COLA AQUI O CAMINHO DA FOTO 9 DE 9 (ex: '/fotos/ninola-9.jpg')
    },
  ],
};
