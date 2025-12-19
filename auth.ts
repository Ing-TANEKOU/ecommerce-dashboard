import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    // Dev-only credentials provider to allow quick sign-in for test users
    ...(process.env.NODE_ENV !== 'production'
      ? [
          Credentials({
            name: 'Dev Login',
            credentials: { email: { label: 'Email', type: 'text' } },
            async authorize(credentials) {
              if (!credentials?.email) return null;
              const email = credentials.email;
              // only allow the test email by default for safety
              if (email !== 'test@example.com') return null;
              const user = await prisma.user.upsert({
                where: { email },
                update: {},
                create: { email, name: 'Test User', role: 'USER' },
              });
              return { id: user.id, email: user.email, name: user.name } as any;
            },
          }),
        ]
      : []),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});