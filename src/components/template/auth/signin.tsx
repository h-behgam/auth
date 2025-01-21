'use client';
import ClientButton from '@/components/global/client-button';
import CustomInput from '@/components/global/custom-input';
import Link from 'next/link';
import { login } from '../../../../actions/auth';
import { useActionState } from 'react';
// import { signIn } from 'next-auth/react';
type initialFormState = {
  error?: any | undefined;
  message?: any | undefined;
};
const initialState: initialFormState = { message: '', error: null };
function SigninTemplate() {
  // const handlerSubmit = (
  //   state: FormState,
  //   formData: FormData,
  // ) => {
  //   signIn('credentials', { formData, callbackUrl: '/dashboard' });
  // };
  const [state, action, pending] = useActionState(login, initialState);
  console.log('state', state);
  console.log('pending', pending);

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
            labelTitle='user'
          />
          {Object.values(state.error?.message.username).map((item:any) => <p className='text-red-700 mt-1'>{item}</p> ) }
          </div>
        <div className='mb-2 p-1'>
          <CustomInput
            name='password'
            type='text'
            placeholder='Password'
            labalName='password'
            labelTitle='Password'
          />
          {Object.values(state.error?.message.password).map((item:any) => <p className='text-red-700 mt-1'>{item}</p> ) }
        </div>
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
        Don't have an account? <Link href={'/signup'}>Sign up</Link>
      </p>
    </div>
  );
}

export default SigninTemplate;
