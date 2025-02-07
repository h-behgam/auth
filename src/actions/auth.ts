'use server';

import { isValidJsonString } from '@/lib/auth/auth-helper';
import { signupSchema } from '@/lib/auth/zod';
import { signIn } from '@/lib/auth/next-auth';
import PrismaDB from '@/lib/PrismaDB';

import {
  type IinputSignup,
  type LoginFormState,
  type Isignup,
} from '@/types/auth-types';

import { hash } from 'bcrypt';
import { signOut } from 'next-auth/react';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

export const signup = async (formData: FormData): Promise<Isignup> => {
  try {
    const { username, password, confirmPassword, name, email } =
      Object.fromEntries(formData) as IinputSignup;

    /**
     * Check form validation
     * if form not validate return error
     */
    const validateForm = signupSchema.safeParse({
      name,
      username,
      email,
      password,
      confirmPassword,
    });
    if (!validateForm.success)
      return {
        success: false,
        error: {
          zod: Object.fromEntries(
            Object.entries(validateForm.error.flatten().fieldErrors),
          ),
        },
      };

    /**
     * Check user exist
     */
    const userExist = await PrismaDB.user.findFirst({
      where: {
        username,
      },
    });
    if (userExist) return { success: false, error: { other: 'User exist' } };

    /**
     * Create user
     */
    const hashedPassword = await hash(password, 10);
    const user = PrismaDB.user.create({
      data: { username, password: hashedPassword, name, email },
    });
    if (!user)
      return { success: false, error: { other: 'We wenr to error!!' } };

    return { success: true, data: (await user).username };
  } catch (error) {
    console.log('errir in server: ', { error });
    return { success: false, error: { other: error as {} } };
  }
};

export const login = async (
  state: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> => {
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
