'use server';

import { isValidJsonString } from '@/lib/auth/custom-auth-error';
import { signIn } from '@/lib/auth/next-auth';

export type FormState = {
  error?: {
    message: {
      username?: string;
      password?: string;
    } | string | null;
  }| null;
  message?: string | undefined;
};

export const login = async (
  state: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    const { username, password } = Object.fromEntries(formData);

    const login = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    return { ...state, message: 'Login successful' };
  } catch (error: any) {
    switch (error.type) {
      case 'CredentialsSignin':
        console.log('aaaa2', { error });
        return {
          ...state,
          message: 'Login failed',
          error: {
            ...error,
            message: isValidJsonString(error.message)
              ? JSON.parse(error.message)
              : error.message,
          },
        };

      default:
        console.log('aaaa5', { error });
        return {
          ...state,
          message: 'Login failed',
          error: { ...error, message: JSON.parse(error.message) },
        };
    }
  }
};
