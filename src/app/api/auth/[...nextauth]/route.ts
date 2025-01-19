import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/app/lib/prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Wallet',
      credentials: {
        wallet: { label: "Wallet Address", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.wallet) {
          return null;
        }

        // Aquí podrías verificar la firma de la wallet o implementar
        // tu propia lógica de autenticación

        // Por ahora, simplemente creamos/actualizamos el usuario
        const user = await prisma.user.upsert({
          where: { wallet: credentials.wallet },
          update: {},
          create: {
            wallet: credentials.wallet,
            name: `Usuario ${credentials.wallet.slice(0, 4)}...${credentials.wallet.slice(-4)}`,
          },
        });

        return {
          id: user.id,
          name: user.name,
          wallet: user.wallet,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.wallet = token.wallet as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.wallet = user.wallet;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login', // Página personalizada de login
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };