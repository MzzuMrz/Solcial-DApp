export interface Post {
  id: string;
  content: string;
  authorUsername: string;
  authorWallet: string;
  likes: number;
  comments: number;
  tips: number;
  createdAt: Date;
}