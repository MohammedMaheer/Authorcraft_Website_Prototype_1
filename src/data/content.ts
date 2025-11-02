export interface TeamMember {
  id: number;
  name: string;
  role: string;
  emoji: string;
  bio: string;
  quote: string;
  image?: string;
  imageAlt?: string;
}

export interface Work {
  id: number;
  title: string;
  author: string;
  category: 'Poem' | 'Story' | 'Script' | 'Microfiction' | 'Essay';
  excerpt: string;
  content: string;
  date: string;
}

export interface Event {
  id: number;
  name: string;
  date: string;
  caption: string;
  emoji: string;
  image?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Preethal Dayananda',
    role: 'President',
    emoji: '🪶',
    bio: 'Chief of Chaos - Leading the literary revolution with vision and passion',
    quote: '"Words are the only immortality we have" - Preethal',
    image: 'https://via.placeholder.com/400x400?text=Preethal+Dayananda',
    imageAlt: ', President of Authorcraft',
  },
  {
    id: 2,
    name: 'Hardhik Sharan Rai',
    role: 'Vice President',
    emoji: '✍️',
    bio: 'Master of words & keeper of stories, guiding Authorcraft\'s creative direction',
    quote: '"Every story deserves to be told" - Rohan',
    image: 'https://via.placeholder.com/400x400?text=Hardhi+k+Sharan+Rai',
    imageAlt: 'Hardhi, Vice President of Authorcraft',
  },
  {
    id: 3,
    name: 'Prachi Shetty',
    role: 'Secretary',
    emoji: '📚',
    bio: 'Curator of creativity & champion of voices, nurturing talented writers',
    quote: '"Quality content is our commitment" - Prachi',
    image: 'https://via.placeholder.com/400x400?text=Prachi+Shetty',
    imageAlt: 'Prachi Shetty, Content Lead of Authorcraft',
  },
  {
    id: 4,
    name: 'Maheer',
    role: 'Digital Head',
    emoji: '🎤',
    bio: 'Digital Orchestrator that make Authorcraft come alive',
    quote: '"Events are where magic happens" - Maheer',
    image: 'https://via.placeholder.com/400x400?text=Arjun+Patel',
    imageAlt: 'Arjun Patel, Events Coordinator of Authorcraft',
  },
  {
    id: 5,
    name: 'abc',
    role: 'Design & Social Lead',
    emoji: '🎨',
    bio: 'Bringing words to visual life and connecting our community across platforms',
    quote: '"Design is storytelling too" - abc',
    image: 'https://via.placeholder.com/400x400?text=abc',
    imageAlt: 'Zara Khan, Design & Social Lead of Authorcraft',
  },
  {
    id: 6,
    name: 'Vishnu Prasad',
    role: 'Treasurer',
    emoji: '💰',
    bio: 'Keeping the creativity alive and ensuring Authorcraft thrives',
    quote: '"Funding creativity is my passion" - Vishnu',
    image: 'https://via.placeholder.com/400x400?text=Vivek+Nair',
    imageAlt: 'Vishnu Prasad, Senior Advisor and Executive Head',
  },
];

export const bestWorks: Work[] = [
  {
    id: 1,
    title: 'Echoes of Tomorrow',
    author: 'A',
    category: 'Poem',
    excerpt: 'In the silence between heartbeats...',
    content: `In the silence between heartbeats,
I find your name written in starlight.
Each word a rebellion, each line a revolution.
We are the poets of our own stories,
The architects of tomorrow's dreams.

Let them say we're too loud, too bold, too alive.
We were born to make noise,
To spill ink like blood,
To turn pain into poetry and chaos into art.

For in every line we write,
A thousand voices find their echo.
And that, dear reader, is our revolution.`,
    date: '2024-09-15',
  },
  {
    id: 2,
    title: 'The Last Train Home',
    author: 'Rohan Verma',
    category: 'Story',
    excerpt: 'She watched the city lights fade as the train pulled away...',
    content: `She watched the city lights fade as the train pulled away, clutching a worn letter in her pocket. Three years. Three years since she left, and now she was going back. Not for herself, but for him.

The compartment was empty except for an old man reading yesterday's newspaper. She smiled at the irony of it all. Life moves forward, but we're always reading yesterday's stories, never brave enough to write tomorrow's.

When the train finally stopped at her station, she could see him waiting on the platform. Older, perhaps. But still there. And that was everything.`,
    date: '2024-08-20',
  },
  {
    id: 3,
    title: 'Ink Therapy',
    author: 'Priya Desai',
    category: 'Microfiction',
    excerpt: 'She had never spoken to anyone about her pen collection...',
    content: `She had never spoken to anyone about her pen collection. Fifty-three pens, each with a story, each with a soul. The red one was from her first heartbreak. The blue one, from her first publication. The gold one? That was from the day she decided to never apologize for her words again.

Her therapist once asked her to talk about her feelings. She brought her pens instead. After that appointment, they both understood: sometimes, the best therapy is the one written in ink.`,
    date: '2024-07-10',
  },
];

export const events: Event[] = [
  {
    id: 1,
    name: 'Steal the Spotlight',
    date: 'Annual',
    caption: 'Words got loud 🔊',
    emoji: '🎤',
  },
  {
    id: 2,
    name: 'Nirvana Magazine Launch',
    date: 'Annual',
    caption: 'Ink got spilled 🖋️',
    emoji: '📖',
  },
  {
    id: 3,
    name: 'Prompt of the Week',
    date: 'Weekly',
    caption: 'Verses in the air ✨',
    emoji: '📝',
  },
  {
    id: 4,
    name: 'Story Slam',
    date: 'Quarterly',
    caption: 'Tales that take you away 🌟',
    emoji: '📚',
  },
  {
    id: 5,
    name: 'Write-a-thon',
    date: 'Seasonal',
    caption: 'Caffeine & creativity flowing ☕',
    emoji: '⌨️',
  },
  {
    id: 6,
    name: 'Open Mic Night',
    date: 'Annual',
    caption: 'Voices united in poetry 🎵',
    emoji: '🎙️',
  },
];
