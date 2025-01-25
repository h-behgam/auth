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
      console.log('isProtected', isProtected);
      console.log('isLoggedIn', isLoggedIn);
      console.log('isAuthRoute', isAuthRoute);

      if (isProtected) {
        // if (!isLoggedIn) return Response.redirect(new URL('/login', nextUrl));
        redirectAuth('/login', nextUrl.origin);
      }
      if (isAuthRoute) {
        if (isLoggedIn)
          // return NextResponse.redirect(new URL('/dashboard', nextUrl));
          redirectAuth('/dashboard', nextUrl.origin);
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
