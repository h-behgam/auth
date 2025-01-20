import { object, string } from 'zod';

export const formSchema = object({
  username: string({ required_error: 'username is requierd' }).min(1).max(20),
  password: string().min(2).max(20)
  // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
});
