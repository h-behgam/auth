import NextAuth, { User } from 'next-auth';
import authConfig from './auth.config';
import Credentials from 'next-auth/providers/credentials';

import PrismaDB from '../PrismaDB';

import { formSchema } from './zod';
import { ZodError } from 'zod';

import { compare } from 'bcrypt';

import {
  CustomCredentialsSignin,
  logger,
  PasswordInccorectError,
  UserDoesNotExistError,
} from './custom-auth-error';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(PrismaDB),
  debug: false,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      options: {
        httpOnly: true, // محدودیت دسترسی جاوااسکریپت
        secure: process.env.NODE_ENV === 'production', // استفاده از HTTPS در حالت تولید
        sameSite: 'strict', // جلوگیری از حملات CSRF
        // path: '/',
      },
    },
  },
  logger: logger,
  pages: {
    signIn: '/loginnnn',
  },
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: {
          label: 'username',
          type: 'string',
        },
        password: {
          label: 'password',
          type: 'string',
        },
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          const { username, password } =
            await formSchema.parseAsync(credentials);
          const user = await PrismaDB.user.findUnique({ where: { username } });

          if (!user) throw new UserDoesNotExistError();

          const isPasswordValid = await compare(
            password,
            user?.password as string,
          );

          if (!isPasswordValid) throw new PasswordInccorectError();
          return user;
        } catch (error) {
          if (
            error instanceof UserDoesNotExistError ||
            error instanceof PasswordInccorectError
          ) {
            throw error;
          } else if (error instanceof ZodError) {
            throw new CustomCredentialsSignin(
              JSON.stringify(error.flatten().fieldErrors),
            );
          } else {
            throw new Error('Unexpected error occurred during authorization');
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ account, token, user, profile, session, trigger }) {
      // console.log('account', account);
      // console.log('token', token);
      // console.log('user', user);
      // console.log('profile', profile);
      // console.log('session', session);
      // console.log('trigger', trigger);
      // const sessions = await PrismaAdapter(PrismaDB).createSession!({
      //   userId: user.id!,
      //   sessionToken,
      //   expires,
      // })
      // token.sessionId = sessions.sessionToken

      return token;
    },
    async session({ session, token, user }) {
      // console.log('session', session);
      // console.log('token', token);
      // console.log('user', user);
      return session;
    },
  },
});
