import { AuthError, CredentialsSignin } from 'next-auth';

/**
 * This is a Custom error for auth v5
 * @param message string | {}
 * @param type any
 * @param name string
 */
export class customError extends AuthError {
  constructor(message: string, name?: string) {
    super();
    this.message = message;
    this.name = name || 'CustomError';
    this.stack = undefined;
  }
}

/**
 * This is a Custom cridential error for auth v5
 * @param code
 * @param type any
 * @param name string
 * @param message string
 */
export class CustomCredentialsSignin extends CredentialsSignin {
  constructor(message: string) {
    super();
    this.name = 'Error';
    this.message = message;
    this.code = 'AuthError';
    this.stack = undefined;
  }
}

// throw new error if user does not exist
export class UserDoesNotExistError extends CredentialsSignin {
  code = 'AuthError';
  message = 'User does not exist - Please check credentials';
  stack = undefined;
}

// throw new error if password is incorrect
export class PasswordInccorectError extends CredentialsSignin {
  code = 'AuthError';
  message = 'Password is incorrect - Please check credentials';
  stack = undefined;
}

// use logger to log errors
export const logger = {
  error: () => {},
  // error: (code: string, ...message: string[]) => {
  // if (code.includes('[auth][error]')) return; // فیلتر خطاهای خاص
  // console.error('loger error is: ', {code});
  // return;
  // }, // جلوگیری از نمایش خطاها
  // warn: console.warn, // نمایش لاگ‌های هشدار
  // debug: console.debug, // لاگ‌های دیباگ را نمایش دهید (در صورت نیاز)
};
