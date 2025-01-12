import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import PrismaDB from './prisma';
import Credentials from 'next-auth/providers/credentials';
import { formSchema } from './zod';
import { ZodError } from 'zod';
import { compare } from 'bcrypt';
// import authConfig from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  // ...authConfig,
  adapter: PrismaAdapter(PrismaDB),
  session: { strategy: 'jwt' },
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
          const validCredentials = formSchema.safeParse(credentials);
          if (!validCredentials.success) {
            return { error: validCredentials.error.flatten().fieldErrors };
          }
          const { username, password } = validCredentials.data;
          const user = await PrismaDB.user.findUnique({ where: { username } });

          if (!user) {
            return null;
          }
          const isPasswordValid = await compare(
            password,
            user?.password as string,
          );
          if (!isPasswordValid) {
            return null;
          }
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            console.log('error', error.errors);

            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
        return null;
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
