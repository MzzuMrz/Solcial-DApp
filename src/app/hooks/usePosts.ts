import { create } from 'zustand';

interface Post {
  id: string;
  content: string;
  authorUsername: string;
  authorWallet: string;
  likes: number;
  comments: number;
  tips: number;
  createdAt: Date;
}

interface CreatePostInput {
  content: string;
  attachments?: string[]; 
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  createPost: (data: CreatePostInput) => Promise<void>; // <-- add createPost
}

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    content: 'Just created my first Solana NFT!',
    authorUsername: 'CryptoArtist',
    authorWallet: 'FLMfHR3ntTNoxqv3jSoFHWgopupuGMFGZnFLxvVGEuNB',
    likes: 15,
    comments: 3,
    tips: 0.5,
    createdAt: new Date('2024-01-17T10:30:00'),
  },
  {
    id: '2',
    content: 'The Solana community is awesome. Thanks for the support 💜',
    authorUsername: 'Web3Developer',
    authorWallet: 'FLMfHR3ntTNoxqv3jSoFHWgopupuGMFGZnFLxvVGEuNB',
    likes: 24,
    comments: 5,
    tips: 1.2,
    createdAt: new Date('2024-01-17T09:15:00'),
  },
  {
    id: '3',
    content: 'Building the future of decentralized social networks ⚡',
    authorUsername: 'BlockchainBuilder',
    authorWallet: 'FLMfHR3ntTNoxqv3jSoFHWgopupuGMFGZnFLxvVGEuNB',
    likes: 32,
    comments: 8,
    tips: 2.0,
    createdAt: new Date('2024-01-17T08:45:00'),
  },
  {
    id: '4',
    content: 'Just sent my first Solana transaction. Impressive speed! ⚡️',
    authorUsername: 'SolanaNewbie',
    authorWallet: 'FLMfHR3ntTNoxqv3jSoFHWgopupuGMFGZnFLxvVGEuNB',
    likes: 10,
    comments: 2,
    tips: 0.1,
    createdAt: new Date('2024-01-17T07:30:00'),
  }
];

export const usePosts = create<PostsState>((set) => ({
  posts: [],
  loading: false,
  error: null,
  
  fetchPosts: async () => {
    set({ loading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ posts: MOCK_POSTS, loading: false });
    } catch (error) {
      set({ error: 'Error loading posts', loading: false });
    }
  },

  createPost: async (data) => {
    // This simulates creating a post on the client
    // In a real scenario, you'd make a request to your backend
    const newPost: Post = {
      id: Math.random().toString(36).substring(2, 9),
      content: data.content,
      authorUsername: 'MockUser', // or from state, or from your connected account
      authorWallet: 'FLMfHR3ntTNoxqv3jSoFHWgopupuGMFGZnFLxvVGEuNB', // or from your connected wallet
      likes: 0,
      comments: 0,
      tips: 0,
      createdAt: new Date(),
    };

    // Optionally handle attachments if needed (store or display them, etc.)
    // For now, we ignore `attachments` in the final data or handle them as you see fit

    set((state) => ({
      posts: [newPost, ...state.posts], // Prepend or append as you like
    }));
  },
}));
