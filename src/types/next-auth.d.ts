import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    wallet: string;
  }

  interface Session {
    user: {
      id: string;
      wallet: string;
      name?: string | null;
    }
  }
}