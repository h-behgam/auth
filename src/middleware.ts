import authConfig from "@/lib/auth/auth.config";
import NextAuth from "next-auth"
import { NextRequest } from "next/server";
interface AuthenticatedRequest extends NextRequest {
  auth?: {
    user?: any; // تایپ کاربر (بسته به تنظیمات شما)
    token?: any; // تایپ توکن (بسته به تنظیمات شما)
  } | null; // امکان null بودن را اضافه می‌کنیم
}
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
 
// 2. Wrapped middleware option
// import { auth } from "./lib/auth/next-auth";
// export default auth(async (req: NextRequest) => {
const { auth } = NextAuth(authConfig)
export default auth(async (req: AuthenticatedRequest) => {
  
  console.log('req', req.nextUrl.pathname);
  console.log('auth', req.auth);
  
  // Your custom middleware logic goes here
})

// Middleware configuration
export const config = {
  matcher: ["/dashboard"],
  // matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/","/(api|trpc)(.*)"],
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/dashboard"],
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  // matcher: ["/((?!api|_next/static|_next/image|.png).*)"],
};
