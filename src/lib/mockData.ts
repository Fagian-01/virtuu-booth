import { Memory, Template, DailyBoothData } from '../lib/types';

export const MOCK_MEMORIES: Memory[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    type: 'photo',
    date: '2026-03-20',
    caption: 'Sunny morning vibes 🌿',
    filters: ['Vintage', 'Soft Glow'],
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
    type: 'photobooth',
    date: '2026-03-19',
    caption: 'Weekend photobooth strip with besties',
    filters: ['Classic 4-Shot'],
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80',
    type: 'virtual-booth',
    date: '2026-03-18',
    caption: 'Long distance movie night snapshots',
    filters: ['Dreamy Y2K'],
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80',
    type: 'photo',
    date: '2026-03-15',
    caption: 'Green tea and sunshine',
    filters: ['Sage Soft'],
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
    type: 'photobooth',
    date: '2026-03-12',
    caption: 'Classic aesthetic strip',
    filters: ['Minimal Cream'],
  },
];

export const MOCK_TEMPLATES: Template[] = [
  {
    id: 't1',
    name: 'Classic 4-Shot Strip',
    description: 'Traditional vertical 4-shot photobooth strip with clean borders.',
    shotsCount: 4,
    bgColor: '#FFFDF5',
    frameStyle: 'border-2 border-emerald-900 shadow-md',
  },
  {
    id: 't2',
    name: 'Soft Green Mint',
    description: 'Fresh mint tint with cozy rounded photo corners.',
    shotsCount: 3,
    bgColor: '#EAF5EA',
    frameStyle: 'rounded-2xl border border-emerald-300',
  },
  {
    id: 't3',
    name: 'Retro Polaroid Grid',
    description: 'Polaroid style single frame with handwritten caption area.',
    shotsCount: 1,
    bgColor: '#FFFDF5',
    frameStyle: 'p-4 pb-12 bg-white shadow-xl rotate-1',
  },
  {
    id: 't4',
    name: 'Cozy Sage Duo',
    description: 'Two-shot vertical split with warm earthy pastel tones.',
    shotsCount: 2,
    bgColor: '#A8D3A8',
    frameStyle: 'rounded-lg border-2 border-emerald-800',
  },
];

export const TODAY_DAILY_BOOTH: DailyBoothData = {
  date: 'Today, March 21',
  theme: 'Soft Green Day',
  description: 'Embrace calm vibes with a gentle sage frame and natural morning lighting filter.',
  template: MOCK_TEMPLATES[1],
};
