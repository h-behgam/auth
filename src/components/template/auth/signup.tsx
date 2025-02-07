'use client'
import { signup } from '@/actions/auth';
import ClientButton from '@/components/global/client-button';
import CustomInput from '@/components/global/custom-input';
import { SignupFormInitialState, signupReducer } from '@/reducers/signup-reducer';
import { IinputSignup, type IsignupFileds } from '@/types/auth-types';
import Link from 'next/link';
import { useReducer, useState } from 'react';
import ErrorFiled from './error-field';

function SignupTemplate() {
  const [state, dispatch] = useReducer(signupReducer, SignupFormInitialState)
  // initial useState
  const [formValues, setFormValues] = useState<IsignupFileds>({
    name: '',
    username: '',
    email: '',
  });
  console.log('response', state);

  const formHandler = async (formData: FormData) => {
    const { username, name, email } = Object.fromEntries(
      formData,
    ) as IinputSignup;

    const response = await signup(formData);
    if (!response.success) {
      setFormValues({name,username,email})
      
      if (response.error.zod) {
        dispatch({type: 'SET_ZOD', payload: response.error.zod})
      }
    }
    // console.log('response', state);
  };
  return (
    <div className='mx-auto w-full max-w-md'>
      <div className='mb-6 text-center'>
        <h2 className='text-3xl font-bold'>Create an account</h2>
        <p>Enter your information to get started</p>
      </div>
      <form className='' action={formHandler}>
        <div className='mb-2 p-1'>
          <CustomInput
            name='name'
            type='text'
            placeholder='Name'
            labalName='name'
            labelTitle='Name'
            autoComplete='autoComplete'
            defaultValue={formValues.name}
          />
          {state.zod && <ErrorFiled  item={state.zod?.name as string[]} />}
        </div>
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
          {state.zod && <ErrorFiled  item={state.zod?.username as string[]} />}
        </div>
        <div className='mb-2 p-1'>
          <CustomInput
            name='email'
            type='text'
            placeholder='Email'
            labalName='email'
            labelTitle='Email'
            autoComplete='autoComplete'
            defaultValue={formValues.email}
          />
          {state.zod && <ErrorFiled  item={state.zod?.email as string[]} />}
        </div>
        <div className='mb-2 p-1'>
          <CustomInput
            name='password'
            type='text'
            placeholder='Password'
            labalName='password'
            labelTitle='Password'
          />
          {state.zod && <ErrorFiled  item={state.zod?.password as string[]} />}
        </div>
        <div className='mb-2 p-1'>
          <CustomInput
            name='confirmPassword'
            type='text'
            placeholder='Confirm Password'
            labalName='confirmPassword'
            labelTitle='Confirm Password'
          />
          {state.zod && <ErrorFiled  item={state.zod?.confirmPassword as string[]} />}
        </div>
        {state && <p className='text-red-700'>{state.other}</p>}
        <div>
          <ClientButton disabled={false}>Sign up</ClientButton>
        </div>
      </form>
      <p className='mt-4 text-center'>
        Already have an account? <Link href={'/login'}>Login</Link>{' '}
      </p>
    </div>
  );
}

export default SignupTemplate;
