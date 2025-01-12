import { object, string } from 'zod';

export const formSchema = object({
  username: string({ required_error: 'username is requierd' }).min(8).max(20),
  password: string().min(8).max(20),
});
