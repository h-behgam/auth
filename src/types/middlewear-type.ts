import { NextRequest } from 'next/server';

export interface AuthenticatedRequest extends NextRequest {
  auth?: {
    user?: any; // تایپ کاربر (بسته به تنظیمات شما)
    token?: any; // تایپ توکن (بسته به تنظیمات شما)
  } | null; // امکان null بودن را اضافه می‌کنیم
}
