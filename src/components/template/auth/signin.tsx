'use client';
import ClientButton from '@/components/global/client-button';
import CustomInput from '@/components/global/custom-input';
import { isValidJsonString } from '@/lib/auth/auth-helper';
import { LoginFormInitialState, loginReducer } from '@/reducers/login-reducer';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useReducer, useState } from 'react';

function SigninTemplate() {
  const [state, dispatch] = useReducer(loginReducer, LoginFormInitialState);
  const [formValues, setFormValues] = useState<{
    username: string;
  }>({
    username: '',
  });

  const formHandler = async (formData: FormData) => {
    const { username, password } = Object.fromEntries(formData) as Record<
      string,
      string
    >;
    const isSignIn = await signIn('credentials', {
      username,
      password,
      redirect: false,
      // redirectTo: '/dashboard',
    });

    if (isSignIn?.error) {
      setFormValues({ username });
      dispatch({ type: 'RESET' });
      const errType = isValidJsonString(isSignIn.code!);
      switch (isSignIn.error) {
        case 'CredentialsSignin':
          console.log('CredentialsSignin', isSignIn.error);
          if (errType) {
            dispatch({
              type: 'SET_ZOD',
              payload: JSON.parse(isSignIn.code!),
            });
          } else {
            dispatch({
              type: 'SET_OTHER',
              payload: isSignIn.code as string,
            });
          }
          return;
        default:
          console.log('OtherError', isSignIn.error);
          dispatch({
            type: 'SET_OTHER',
            payload: isSignIn.code as string,
          });
          return;
      }
    }
    setFormValues({ username: '' });
    dispatch({ type: 'RESET' });
    redirect('/dashboard');
  };
  return (
    <div className='mx-auto w-full max-w-md'>
      <div className='mb-6 text-center'>
        <h2 className='text-3xl font-bold'>Login</h2>
        <p>Enter your email below to login to your account</p>
      </div>
      <form className='' action={formHandler}>
        <div className='mb-2 p-1'>
          <CustomInput
            name='username'
            type='text'
            placeholder='Username'
            labalName='username'
            labelTitle='Username'
            autoComplete='autoComplete'
            defaultValue={formValues.username}
          />
          {state.zod?.username &&
            Object.values(state.zod?.username).map((item) => (
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
          {state.other && <p className='mt-1 text-red-700'>{state.other}</p>}
        </div>
        {state.zod?.password &&
          Object.values(state.zod?.password).map((item) => (
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
