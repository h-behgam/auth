import { NextRequest } from 'next/server';

// type User = Record<string, unknown>; // برای کاربران با فیلدهای نامشخص
// type Token = Record<string, unknown>; // برای توکن با فیلدهای نامشخص

interface User {
  id: string; // یا هر نوعی که برای ID کاربر استفاده می‌کنید
  name: string;
  email: string;
  // هر فیلد دیگری که برای کاربر دارید
}

interface Token {
  accessToken: string;
  expiresAt: Date; // یا نوعی که برای زمان انقضا استفاده می‌کنید
  // هر فیلد دیگری که برای توکن دارید
}
export interface AuthenticatedRequest extends NextRequest {
  auth?: {
    user?: User; // تایپ کاربر (بسته به تنظیمات شما)
    token?: Token; // تایپ توکن (بسته به تنظیمات شما)
  } | null; // امکان null بودن را اضافه می‌کنیم
}
