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

/**
 * Handles the user signup process.
 *
 * This function takes form data, validates it, checks if the user or email already exists,
 * and then creates a new user if all validations pass.
 *
 * @param {FormData} formData - The form data containing user information (username, password, confirmPassword, name, email).
 * @returns {Promise<Isignup>} - A promise that resolves to an object indicating the success or failure of the signup process.
 *                              On success, it returns the username of the newly created user.
 *                              On failure, it returns an error object with details about what went wrong.
 */
export const signup = async (formData: FormData): Promise<Isignup> => {
  try {
    // Extract form data fields
    const { username, password, confirmPassword, name, email } =
      Object.fromEntries(formData) as IinputSignup;

    /**
     * Validate the form data using a schema.
     * If validation fails, return an error object with validation details.
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
     * Check if a user with the provided username already exists.
     * If the user exists, return an error indicating that the username is already taken.
     */
    const userExist = await PrismaDB.user.findFirst({
      where: {
        username,
      },
    });
    if (userExist)
      return {
        success: false,
        error: { other: { message: 'User already exists' } },
      };

    /**
     * Check if a user with the provided email already exists.
     * If the email exists, return an error indicating that the email is already in use.
     */
    const emailExist = await PrismaDB.user.findFirst({
      where: {
        email,
      },
    });
    if (emailExist)
      return {
        success: false,
        error: { zod: { email: 'Email already in use' } },
      };

    /**
     * Hash the user's password and create a new user record in the database.
     * If the user creation fails, return an error indicating a server error.
     */
    const hashedPassword = await hash(password, 10);
    const user = await PrismaDB.user.create({
      data: { username, password: hashedPassword, name, email },
    });
    if (!user)
      return {
        success: false,
        error: { other: { message: 'Server error: Unable to create user' } },
      };

    // Return success with the username of the newly created user
    return { success: true, data: { username: user.username } };
  } catch (error) {
    // Handle any unexpected errors and return a generic server error message
    return { success: false, error: { other: { server: error as {} } } };
  }
};

/**
 * I dont use it becouse redirect function of signIn not work in server action when you use client component
 * @param state
 * @param formData
 * @returns {Promise<LoginFormState>}
 */
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

/**
 * I dont use it becouse redirect function of signOut not work in server action when you use client component
 */
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
