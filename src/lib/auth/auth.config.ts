import Credentials from 'next-auth/providers/credentials';
// import { PrismaAdapter } from '@auth/prisma-adapter';
import type { NextAuthConfig } from 'next-auth';

// import PrismaDB from '../PrismaDB';

// import { logger } from './custom-auth-error';

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Credentials],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // مسیرهای محافظت‌شده را تعریف کنید
      const protectedPaths = ['/dashboard'];
      //   const isProtected = protectedRoutes.some((route) =>
      //     request.nextUrl.pathname.startsWith(route)
      //   );

      //   if (!session && isProtected) {
      //     const absoluteURL = new URL("/", request.nextUrl.origin);
      //     return NextResponse.redirect(absoluteURL.toString());
      //   }
      console.log(11111);

      const isLoggedIn = !!auth?.user;
      console.log('isLoggedIn', isLoggedIn);

      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
