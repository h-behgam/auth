import Credentials from 'next-auth/providers/credentials';
// import { PrismaAdapter } from '@auth/prisma-adapter';
import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

// import PrismaDB from '../PrismaDB';

// import { logger } from './custom-auth-error';

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Credentials],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // مسیرهای محافظت‌شده را تعریف کنید
      const loginpage = Response.redirect(new URL('/login', nextUrl));
      const protectedPaths = ['/dashboard'];
      const authRoute = ['/signup', '/login'];
      //   const isProtected = protectedRoutes.some((route) =>
      //     request.nextUrl.pathname.startsWith(route)
      //   );

      //   if (!session && isProtected) {
      //     const absoluteURL = new URL("/", request.nextUrl.origin);
      //     return NextResponse.redirect(absoluteURL.toString());
      //   }
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

      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isProtected) {
        if (!isLoggedIn) return Response.redirect(new URL('/login', nextUrl));
      }
      if (isAuthRoute) {
        if (isLoggedIn)
          return NextResponse.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
