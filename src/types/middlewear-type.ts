import { NextRequest } from "next/server";
import { Session } from "next-auth"; // ایمپورت تایپ صحیح از NextAuth

// interface User {
//   name?: string | null; // فیلد name می‌تواند null یا undefined باشد
//   email?: string | null;
//   image?: string | null;
// }

// interface Token {
//   accessToken?: string;
//   expiresAt?: Date;
// }

// تغییر تایپ AuthenticatedRequest برای انطباق با NextAuth
export interface AuthenticatedRequest extends NextRequest {
  auth?: Session | null; // به جای تعریف دستی، از تایپ `Session` استفاده می‌کنیم
}

