import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { AuthError } from 'next-auth';
import PrismaDB from './prisma';
import Credentials from 'next-auth/providers/credentials';
import { formSchema } from './zod';
import { ZodError } from 'zod';
import { compare } from 'bcrypt';
import {
  customError,
  CustomCredentialsSignin,
  logger,
  PasswordInccorectError,
  UserDoesNotExistError,
  CustomErrorr,
} from './custom-error';
// import authConfig from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  // ...authConfig,
  adapter: PrismaAdapter(PrismaDB),
  debug: false,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/sign-in',
    verifyRequest: '/auth/auth-success',
    error: '/auth/auth-error',
  },
  logger: logger,
  providers: [
    Credentials({
      credentials: {
        username: {
          label: 'username',
          type: 'string',
        },
        password: {
          label: 'password',
          type: 'string',
        },
      },
      authorize: async (credentials): Promise<any> => {
        try {
          const { username, password } =
            await formSchema.parseAsync(credentials);
          console.log('continu auth');

          // const { username, password } = validCredentials.data;
          const user = await PrismaDB.user.findUnique({ where: { username } });

          if (!user) {
            throw new UserDoesNotExistError();
          }

          const isPasswordValid = await compare(
            password,
            user?.password as string,
          );

          if (!isPasswordValid) {
            throw new PasswordInccorectError();
            throw new CustomCredentialsSignin(
              'The password is not corect!',
              'wrongPassword',
            );
          }
          return user;
        } catch (error: any) {
          if (
            error instanceof UserDoesNotExistError ||
            error instanceof PasswordInccorectError 
          ) {
            throw error;
          } else if (error instanceof ZodError) {


            const a = error.flatten().fieldErrors
            console.log(
              'error in next auth catch',
              a,
            );
            const err = error.flatten().fieldErrors;
            // console.log('errerrerrerr', err);
            throw new CustomCredentialsSignin(JSON.stringify(error.flatten().fieldErrors));
          } else {
            throw new Error('Unexpected error occurred during authorization');
          }

          if (error instanceof ZodError) {
            console.log(
              'error in next auth catch',
              error.flatten().fieldErrors,
            );
            const err = error.flatten().fieldErrors;
            console.log(err);
            throw new CustomCredentialsSignin(err, 'zoderror');
          }

          if (error.type == 'wrongPassword') {
            // console.log({error});
            throw new CustomCredentialsSignin(
              error.message,
              'wrongPassword',
              'passwordError',
            );
          }

          return null;
        }
      },
    }),
  ],
});

// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { NextAuthOptions } from 'next-auth';
// import PrismaDB from './prisma';
// import Credentials from 'next-auth/providers/credentials';
// import { compare } from 'bcrypt';
// import { User } from '@prisma/client';

// export const authOption: NextAuthOptions = {
//   adapter: PrismaAdapter(PrismaDB),
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: { signIn: '/login' },
//   session: { strategy: 'jwt' },
//   debug: process.env.NODE_ENV === 'development',
//   providers: [
//     Credentials({
//       name: 'credential',
//       credentials: {
//         username: {
//           label: 'username',
//           type: 'string',
//         },
//         password: {
//           label: 'password',
//           type: 'string',
//         },
//       },
//       async authorize(credential): Promise<any> {
//         if (!credential?.username || !credential.password) return null;

//         const user = await PrismaDB.user.findUnique({
//           where: { username: credential.username },
//         });
//         if (!user) return null;

//         const isPasswordValid = await compare(
//           credential.password,
//           user.hashedPassword as string,
//         );
//         if (!isPasswordValid) return null;

//         return user;
//       },
//     }),
//   ],
//   callbacks: {
//     session: ({ session }) => {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//         },
//       };
//     },
//     jwt: ({token,user}) => {
//         const u = user as unknown as User
//         if (u) {
//             return {
//                 ...token
//             }
//         }

//         return token
//     }
//   },
// };
