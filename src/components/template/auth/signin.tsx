'use client';
import { login } from '@/actions/auth';
import ClientButton from '@/components/global/client-button';
import CustomInput from '@/components/global/custom-input';
import { revalidatePath } from 'next/cache';
// import { revalidatePath } from 'next/cache';
import Link from 'next/link';
// import { redirect, useRouter } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

function SigninTemplate() {
  const router = useRouter(); // ⬅️ خارج از شرط اجرا شود
  const initialState = { message: 'Please fill in the form', error: null };

  const [state, action, pending] = useActionState(login, initialState);
  // if (!pending && state.message === "Login successful") {
  //   // useRouter().refresh();
  //   useRouter().push('/dashboard');
  //   // revalidatePath('/dashboard')
  //   // redirect( '/dashboard');
  // }


  useEffect(() => {
    if (!pending && state.message === 'Login successful') {
      router.push('/dashboard');
      router.refresh(); // ✅ اجرای بدون تغییر در ترتیب Hooks
      // revalidatePath('/dashboard')
      // redirect( '/dashboard');
    }
  }, [pending, state.message, router]);
  console.log('state', state);
  // console.log('pending', pending);

  return (
    <div className='mx-auto w-full max-w-md'>
      <div className='mb-6 text-center'>
        <h2 className='text-3xl font-bold'>Login</h2>
        <p>Enter your email below to login to your account</p>
      </div>
      <form className='' action={action}>
        <div className='mb-2 p-1'>
          <CustomInput
            name='username'
            type='text'
            placeholder='Username'
            labalName='username'
            labelTitle='Username'
            autoComplete='autoComplete'
          />
          {typeof state.error?.message === 'object' &&
            state.error?.message?.username &&
            Object.values(state.error.message.username).map((item) => (
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
          {typeof state.error?.message === 'string' && state.error?.message && (
            <p className='mt-1 text-red-700'>{state.error?.message}</p>
          )}
        </div>
        {typeof state.error?.message === 'object' &&
          state.error?.message?.password &&
          Object.values(state.error.message.password).map((item) => (
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
          <ClientButton disabled={pending}>Sign in</ClientButton>
        </div>
      </form>
      <p className='mt-4 text-center'>
        Don &apos; t have an account? <Link href={'/signup'}>Sign up</Link>
      </p>
    </div>
  );
}

export default SigninTemplate;
