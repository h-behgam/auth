export type IinputSignup = Record<
  'username' | 'password' | 'confirmPassword' | 'name' | 'email',
  string
>;

export interface Isignup {
  success: boolean;
  error?: {
    zod?: Record<string, string | string[]>;
    other?: {
      message?: string;
      server?: object;
    };
  };
  data?: object;
}

export interface IsignupFileds {
  name: string;
  username: string;
  email: string;
}
export type LoginFormState = {
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
