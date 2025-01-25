import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import { redirectAuth } from './auth-helper';

export default {
  providers: [Credentials],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // مسیرهای محافظت‌شده را تعریف کنید
      const protectedPaths = ['/dashboard'];
      const authRoute = ['/signup', '/login'];
      const isLoggedIn = !!auth?.user;
      console.log(nextUrl.pathname);

      const isProtected = protectedPaths.some((route) =>
        nextUrl.pathname.startsWith(route),
      );

      const isAuthRoute = authRoute.some((route) =>
        nextUrl.pathname.startsWith(route),
      );

      if (isProtected) {
        if (!isLoggedIn) return redirectAuth('/login', nextUrl.origin);
      }
      if (isAuthRoute) {
        if (isLoggedIn) return redirectAuth('/dashboard', nextUrl.origin);
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
