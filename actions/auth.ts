'use server';

import { signIn } from '@/lib/next-auth';
import { ZodError } from 'zod';

export type FormState = {
  message: '';
  error: null;
};

export const login = async (state: FormState, formData: FormData) => {
  try {
    console.log(333333333333333);

    const login = await signIn('credentials', {
      username: 'hadi',
      password: '1234',
      redirect: false,
      // callbackUrl: '/dashboard',
    });
    console.log('login in auth', { login });
    if (login?.error) {
      console.log(11111111111111);

      return { error: login.error };
    }
    return login;
  } catch (error: any) {
    // console.log('errir in catch auth: ', { error });
    switch (error.type) {
      case 'CredentialsSignin':
        console.log('aaaa1', {error});

      case 'CallbackRouteError':
        console.log('aaaa2', {error});
        return { error: 'Invalid credentials!' };

      case 'wrongPassword':
        console.log('aaaa3', {error});
        console.log(error.message);
        return null;
        
        case 'zoderror':
          console.log('aaaa4');
          console.log({error});
        return;

      default:
        console.log('aaaa5');
        console.log('error.message', error);

        return { error: 'Something went wrong!' };
    }
  }
};
