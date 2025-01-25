import authConfig from '@/lib/auth/auth.config';
import NextAuth from 'next-auth';


// Use only one of the two middleware options below
// 1. Use middleware directly
export const { auth: middleware } = NextAuth(authConfig)


/**
 * // 2. Wrapped middleware option
 * // import { auth } from "./lib/auth/next-auth";
 * // export default auth(async (req: NextRequest) => {
 */
// const { auth } = NextAuth(authConfig);
// export default auth(async (req: AuthenticatedRequest) => {
//   console.log('req', req.nextUrl.pathname);
//   console.log('auth', req.auth);
// });

// Middleware configuration
export const config = {
  // matcher: ['/dashboard', '/signup'],
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/","/(api|trpc)(.*)"],
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/dashboard"],
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.svg|.png|.ico).*)"],
  // matcher: ["/((?!api|_next/static|_next/image|.png).*)"],
};
