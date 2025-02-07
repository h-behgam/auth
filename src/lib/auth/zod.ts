import { object, string, z } from 'zod';

export const formSchema = object({
  username: string({ required_error: 'Username is requierd' }).min(1).max(20),
  password: string({ required_error: 'Password is requierd' }).min(2).max(20),
});

export const signupSchema = object({
  name: string({ required_error: 'Name is requierd' })
    .min(4)
    .max(40)
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
  email: string({ required_error: 'Email is requierd' }).email({
    message: 'Enter email correctly.',
  }),
  username: string({ required_error: 'Username is requierd' }).min(1).max(20),
  password: string({ required_error: 'Password is requierd' }).min(2).max(20),
  confirmPassword: string({ required_error: 'Please confirm your password' })
    .min(2)
    .max(20),
}).superRefine((val, ctx) => {
  if (val.password !== val.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'The passwords did not match',
      path: ['confirm'],
    });
  }
});

export const signinSchema = object({
  username: string({ required_error: 'username is requierd' }).min(1).max(20),
  password: string({ required_error: 'Password is requierd' })
    .min(2)
    .max(20)
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
});
