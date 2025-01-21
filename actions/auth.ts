'use server';

import { signIn } from '@/lib/next-auth';

export type FormState = {
  message: string;
  error: null;
};

export const login = async (state: FormState, formData: FormData) => {
  try {
    const { username, password } = Object.fromEntries(formData);

    const login = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    return { message: login };
  } catch (error: any) {
    switch (error.type) {
      case 'CredentialsSignin':
        console.log('aaaa2', { error });
        return { error: error.message };

      default:
        console.log('aaaa5', { error });
        return { error: error };
    }
  }
};
