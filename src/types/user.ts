export interface User {
    id: string;
    username: string;
    email: string;
    walletAddress?: string;
    profileImage?: string;
    bio?: string;
    followers?: number;
    following?: number;
    createdAt: Date;
  }
  