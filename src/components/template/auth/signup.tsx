'use client'
import { signup } from '@/actions/auth';
import ClientButton from '@/components/global/client-button';
import CustomInput from '@/components/global/custom-input';
import { SignupFormInitialState, signupReducer } from '@/reducers/signup-reducer';
import { IinputSignup, type IsignupFileds } from '@/types/auth-types';
import Link from 'next/link';
import { useReducer, useState } from 'react';

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
          {state && <p className='text-red-700'>{state.zod?.name}</p>}
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
          {state && <p className='text-red-700'>{state.zod?.username}</p>}
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
          {state && <p className='text-red-700'>{state.zod?.email}</p>}
        </div>
        <div className='mb-2 p-1'>
          <CustomInput
            name='password'
            type='text'
            placeholder='Password'
            labalName='password'
            labelTitle='Password'
          />
          {state && <p className='text-red-700'>{state.zod?.password}</p>}
        </div>
        <div className='mb-2 p-1'>
          <CustomInput
            name='confirmPassword'
            type='text'
            placeholder='Confirm Password'
            labalName='confirmPassword'
            labelTitle='Confirm Password'
          />
          {state && <p className='text-red-700'>{state.zod?.confirmPassword}</p>}
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
