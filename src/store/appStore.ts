import { create } from 'zustand';

export interface TourPackage {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  duration: string;
  location: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
}

interface ThemeSettings {
  primaryColor: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
}

interface AppState {
  tours: TourPackage[];
  posts: BlogPost[];
  theme: ThemeSettings;
  addTour: (tour: TourPackage) => void;
  updateTour: (id: string, tour: Partial<TourPackage>) => void;
  deleteTour: (id: string) => void;
  addPost: (post: BlogPost) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  updateTheme: (settings: Partial<ThemeSettings>) => void;
}

const defaultTours: TourPackage[] = [
  {
    id: '1',
    title: '제주도 3박 4일 프리미엄 호캉스',
    description: '최고급 5성급 호텔에서 즐기는 완벽한 휴식과 제주도의 아름다운 자연을 만끽하세요.',
    price: 1250000,
    imageUrl: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=800',
    duration: '3박 4일',
    location: '제주도',
  },
  {
    id: '2',
    title: '울릉도 신비의 섬 탐험',
    description: '때묻지 않은 자연 그대로의 울릉도, 신비로운 해안 절경과 함께하는 특별한 여행.',
    price: 890000,
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800',
    duration: '2박 3일',
    location: '울릉도',
  },
  {
    id: '3',
    title: '부산 럭셔리 요트 투어 & 미식 여행',
    description: '해운대 밤바다를 가르는 요트 투어와 부산 최고의 미식을 경험하는 럭셔리 패키지.',
    price: 650000,
    imageUrl: 'https://images.unsplash.com/photo-1590523264426-52b311145d8b?auto=format&fit=crop&q=80&w=800',
    duration: '1박 2일',
    location: '부산',
  }
];

const defaultPosts: BlogPost[] = [
  {
    id: '1',
    title: '2026년 꼭 가봐야 할 국내 숨은 명소 TOP 5',
    excerpt: '아직 많은 사람들에게 알려지지 않은 보석 같은 국내 여행지를 소개합니다.',
    date: '2026-04-10',
    imageUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    title: '프리미엄 호캉스를 위한 완벽한 가이드',
    excerpt: '성공적인 호캉스를 위해 알아두면 좋은 꿀팁과 호텔 선택 기준을 알아봅니다.',
    date: '2026-04-05',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?auto=format&fit=crop&q=80&w=800',
  }
];

export const useAppStore = create<AppState>((set) => ({
  tours: defaultTours,
  posts: defaultPosts,
  theme: {
    primaryColor: '#0ea5e9',
    heroTitle: '당신의 특별한 순간, 원섬투어와 함께',
    heroSubtitle: '프리미엄 국내 여행의 새로운 기준을 제시합니다',
    heroImageUrl: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&q=80&w=1920',
  },
  addTour: (tour) => set((state) => ({ tours: [...state.tours, tour] })),
  updateTour: (id, updatedTour) => set((state) => ({
    tours: state.tours.map((t) => t.id === id ? { ...t, ...updatedTour } : t)
  })),
  deleteTour: (id) => set((state) => ({ tours: state.tours.filter((t) => t.id !== id) })),
  
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  updatePost: (id, updatedPost) => set((state) => ({
    posts: state.posts.map((p) => p.id === id ? { ...p, ...updatedPost } : p)
  })),
  deletePost: (id) => set((state) => ({ posts: state.posts.filter((p) => p.id !== id) })),
  
  updateTheme: (settings) => set((state) => {
    // Update CSS variable for primary color if it changes
    if (settings.primaryColor) {
      document.documentElement.style.setProperty('--primary', settings.primaryColor);
    }
    return { theme: { ...state.theme, ...settings } };
  }),
}));
