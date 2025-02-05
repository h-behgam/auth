'use client';
import ClientButton from '@/components/global/client-button';
import CustomInput from '@/components/global/custom-input';
import { isValidJsonString } from '@/lib/auth/auth-helper';
// import { AuthError } from 'next-auth';
import { signIn } from 'next-auth/react';
// import { isRedirectError } from 'next/dist/client/components/redirect-error';
import Link from 'next/link';
// import { redirect } from 'next/navigation';
import { useState } from 'react';

export type FormState = {
  zod?: {
    username?: string;
    password?: string;
  } | null;
  other?: string | null;
};
function SigninTemplate() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // dispatch({ type: 'SET_SHOW_IMAGE', payload: !!props?.id });
  const [formError, setFormError] = useState<{
    zod?: {
      username?: string;
      password?: string;
    } | null;
    other?: string | null;
  }>({
    zod: null,
    other: null,
  });
  return (
    <div className='mx-auto w-full max-w-md'>
      <div className='mb-6 text-center'>
        <h2 className='text-3xl font-bold'>Login</h2>
        <p>Enter your email below to login to your account</p>
      </div>
      <form
        className=''
        action={async (formData) => {
          const { username, password } = Object.fromEntries(formData);

          const isSignIn = await signIn('credentials', {
            username,
            password,
            // redirect: false,
            redirectTo: '/dashboard',
          });
          console.log({ message: 'Login successful' }, isSignIn);
          if (isSignIn?.error) {
            const errType = isValidJsonString(isSignIn.code!);
            switch (isSignIn.error) {
              case 'CredentialsSignin':
                console.log('aaaa2', isSignIn.error);
                if (errType) {
                  setFormError({
                    ...formError,
                    zod: JSON.parse(isSignIn.code!),
                  });
                } else {
                  setFormError({
                    ...formError,
                    other: isSignIn.code as string,
                  });
                }
                return;
              default:
                console.log('aaaa5', isSignIn.error);
                setFormError({ ...formError, other: isSignIn.code as string });
                return;
            }
          }
        }}
      >
        <div className='mb-2 p-1'>
          <CustomInput
            name='username'
            type='text'
            placeholder='Username'
            labalName='username'
            labelTitle='Username'
            autoComplete='autoComplete'
          />
          {typeof formError.zod === 'object' &&
            formError.zod?.username &&
            Object.values(formError.zod?.username).map((item) => (
              <p className='mt-1 text-red-700' key={item}>
                {item}
              </p>
            ))}
        </div>
        <div className='mb-2 p-1'>
          <CustomInput
            name='password'
            type='text'
            placeholder='Password'
            labalName='password'
            labelTitle='Password'
          />
          {formError.other && (
            <p className='mt-1 text-red-700'>{formError.other}</p>
          )}
        </div>
        {typeof formError.zod === 'object' &&
          formError.zod?.password &&
          Object.values(formError.zod?.password).map((item) => (
            <p className='mt-1 text-red-700' key={item}>
              {item}
            </p>
          ))}
        <div className='mb-2 text-right'>
          <Link
            href={'/forgot-password'}
            className='text-sm text-indigo-700 hover:text-indigo-600'
          >
            Forgot your password?
          </Link>
        </div>
        <div>
          <ClientButton disabled={false}>Sign in</ClientButton>
        </div>
      </form>
      <p className='mt-4 text-center'>
        Don &apos; t have an account? <Link href={'/signup'}>Sign up</Link>
      </p>
    </div>
  );
}

export default SigninTemplate;

// 'use client';
// import { login } from '@/actions/auth';
// import ClientButton from '@/components/global/client-button';
// import CustomInput from '@/components/global/custom-input';
// import { revalidatePath } from 'next/cache';
// // import { revalidatePath } from 'next/cache';
// import Link from 'next/link';
// // import { redirect, useRouter } from 'next/navigation';
// import { redirect, useRouter } from 'next/navigation';
// import { useActionState, useEffect } from 'react';

// function SigninTemplate() {
//   const router = useRouter(); // ⬅️ خارج از شرط اجرا شود
//   const initialState = { message: 'Please fill in the form', error: null };

//   const [state, action, pending] = useActionState(login, initialState);
//   // if (!pending && state.message === "Login successful") {
//   //   // useRouter().refresh();
//   //   useRouter().push('/dashboard');
//   //   // revalidatePath('/dashboard')
//   //   // redirect( '/dashboard');
//   // }

//   // useEffect(() => {
//   //   if (!pending && state.message === 'Login successful') {
//   //     router.push('/dashboard');
//   //     router.refresh(); // ✅ اجرای بدون تغییر در ترتیب Hooks
//   //     console.log(111);

//   //     // revalidatePath('/dashboard')
//   //     redirect( '/dashboard');
//   //   }
//   // }, [pending, state.message, router]);
//   console.log('state', state);
//   console.log('pending', pending);

//   return (
//     <div className='mx-auto w-full max-w-md'>
//       <div className='mb-6 text-center'>
//         <h2 className='text-3xl font-bold'>Login</h2>
//         <p>Enter your email below to login to your account</p>
//       </div>
//       <form className='' action={action}>
//         <div className='mb-2 p-1'>
//           <CustomInput
//             name='username'
//             type='text'
//             placeholder='Username'
//             labalName='username'
//             labelTitle='Username'
//             autoComplete='autoComplete'
//           />
//           {typeof state.error?.message === 'object' &&
//             state.error?.message?.username &&
//             Object.values(state.error.message.username).map((item) => (
//               <p className='mt-1 text-red-700' key={item}>
//                 {item}
//               </p>
//             ))}
//         </div>
//         <div className='mb-2 p-1'>
//           <CustomInput
//             name='password'
//             type='text'
//             placeholder='Password'
//             labalName='password'
//             labelTitle='Password'
//           />
//           {typeof state.error?.message === 'string' && state.error?.message && (
//             <p className='mt-1 text-red-700'>{state.error?.message}</p>
//           )}
//         </div>
//         {typeof state.error?.message === 'object' &&
//           state.error?.message?.password &&
//           Object.values(state.error.message.password).map((item) => (
//             <p className='mt-1 text-red-700' key={item}>
//               {item}
//             </p>
//           ))}
//         <div className='mb-2 text-right'>
//           <Link
//             href={'/forgot-password'}
//             className='text-sm text-indigo-700 hover:text-indigo-600'
//           >
//             Forgot your password?
//           </Link>
//         </div>
//         <div>
//           <ClientButton disabled={pending}>Sign in</ClientButton>
//         </div>
//       </form>
//       <p className='mt-4 text-center'>
//         Don &apos; t have an account? <Link href={'/signup'}>Sign up</Link>
//       </p>
//     </div>
//   );
// }

// export default SigninTemplate;

// 'use client';
// // import { login } from '@/actions/auth';
// import ClientButton from '@/components/global/client-button';
// import CustomInput from '@/components/global/custom-input';
// import { isValidJsonString } from '@/lib/auth/auth-helper';
// import { AuthError } from 'next-auth';
// import { signIn } from 'next-auth/react';
// import { isRedirectError } from 'next/dist/client/components/redirect-error';
// // import { revalidatePath } from 'next/cache';
// // import { revalidatePath } from 'next/cache';
// import Link from 'next/link';
// import { redirect } from 'next/navigation';
// // import { redirect, useRouter } from 'next/navigation';
// // import { redirect, useRouter } from 'next/navigation';
// // import { useActionState, useEffect } from 'react';
// export type FormState = {
//   error?: {
//     message:
//       | {
//           username?: string;
//           password?: string;
//         }
//       | string
//       | null;
//   } | null;
//   message?: string | undefined;
// };
// function SigninTemplate() {
//   // const router = useRouter(); // ⬅️ خارج از شرط اجرا شود
//   // const initialState = { message: 'Please fill in the form', error: null };

//   // const [state, action, pending] = useActionState(login, initialState);
//   // if (!pending && state.message === "Login successful") {
//   //   // useRouter().refresh();
//   //   useRouter().push('/dashboard');
//   //   // revalidatePath('/dashboard')
//   //   // redirect( '/dashboard');
//   // }

//   // useEffect(() => {
//   //   if (!pending && state.message === 'Login successful') {
//   //     // router.push('/dashboard');
//   //     router.refresh(); // ✅ اجرای بدون تغییر در ترتیب Hooks
//   //     console.log(111);

//   //     // revalidatePath('/dashboard')
//   //     // redirect( '/dashboard');
//   //   }
//   // }, [pending, state.message, router]);
//   // console.log('state', state);
//   // console.log('pending', pending);

//   return (
//     <div className='mx-auto w-full max-w-md'>
//       <div className='mb-6 text-center'>
//         <h2 className='text-3xl font-bold'>Login</h2>
//         <p>Enter your email below to login to your account</p>
//       </div>
//       <form className='' action={async(formData)=>{

//         // try {
//               const { username, password } = Object.fromEntries(formData);

//               const l = await signIn('credentials', {
//                 username,
//                 password,
//                 redirect: false,
//                 // redirectTo: '/dashboard',
//               });
//               // revalidatePath('/dashboard');
//               console.log(
//                {  message: 'Login successful' }, l);
//               //  if (!l?.error) redirect('/dashboard')
//               // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             // } catch (error: any) {
//             //   if (error instanceof AuthError) {
//             //     return redirect(`/login?error=${error.type}`)
//             //   }
//             //   throw error
//             //   if (isRedirectError(error)) {
//             //         console.log('error in logout auth is : ', error);
//             //         return
//             //       }
//             //   console.log({error});
//               return

//               // switch (error.type) {
//               //   case 'CredentialsSignin':
//               //     console.log('aaaa2', { error });
//               //     return {

//               //       message: 'Login failed',
//               //       error: {
//               //         ...error,
//               //         message: isValidJsonString(error.message)
//               //           ? JSON.parse(error.message)
//               //           : error.message,
//               //       },
//               //     };

//               //   default:
//               //     console.log('aaaa5', { error });
//               //     return {

//               //       message: 'Login failed',
//               //       error: { ...error, message: JSON.parse(error.message) },
//               //     };
//               // }
//             // }
//       }}>
//         <div className='mb-2 p-1'>
//           <CustomInput
//             name='username'
//             type='text'
//             placeholder='Username'
//             labalName='username'
//             labelTitle='Username'
//             autoComplete='autoComplete'
//           />
//           {/* {typeof state.error?.message === 'object' &&
//             state.error?.message?.username &&
//             Object.values(state.error.message.username).map((item) => (
//               <p className='mt-1 text-red-700' key={item}>
//                 {item}
//               </p>
//             ))} */}
//         </div>
//         <div className='mb-2 p-1'>
//           <CustomInput
//             name='password'
//             type='text'
//             placeholder='Password'
//             labalName='password'
//             labelTitle='Password'
//           />
//           {/* {typeof state.error?.message === 'string' && state.error?.message && (
//             <p className='mt-1 text-red-700'>{state.error?.message}</p>
//           )} */}
//         </div>
//         {/* {typeof state.error?.message === 'object' &&
//           state.error?.message?.password &&
//           Object.values(state.error.message.password).map((item) => (
//             <p className='mt-1 text-red-700' key={item}>
//               {item}
//             </p>
//           ))} */}
//         <div className='mb-2 text-right'>
//           <Link
//             href={'/forgot-password'}
//             className='text-sm text-indigo-700 hover:text-indigo-600'
//           >
//             Forgot your password?
//           </Link>
//         </div>
//         <div>
//           <ClientButton disabled={false}>Sign in</ClientButton>
//         </div>
//       </form>
//       <p className='mt-4 text-center'>
//         Don &apos; t have an account? <Link href={'/signup'}>Sign up</Link>
//       </p>
//     </div>
//   );
// }

// export default SigninTemplate;
