'use server';

import { isValidJsonString } from '@/lib/auth/auth-helper';
import { signIn } from '@/lib/auth/next-auth';
import { signOut } from 'next-auth/react';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

export type FormState = {
  error?: {
    message:
      | {
          username?: string;
          password?: string;
        }
      | string
      | null;
  } | null;
  message?: string | undefined;
};

export const login = async (
  state: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    const { username, password } = Object.fromEntries(formData);

    await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    return { ...state, message: 'Login successful' };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const logout = async () => {
  try {
    await signOut({ redirectTo: '/login' });
  } catch (error) {
    console.log('error', error);
    
    if (isRedirectError(error)) {
      console.log('error in logout auth is : ', error);
      throw error;
    }
  }
};
