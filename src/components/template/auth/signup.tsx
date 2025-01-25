import ClientButton from '@/components/global/client-button';
import CustomInput from '@/components/global/custom-input';
import Link from 'next/link';

function SignupTemplate() {
  return (
    <div className='mx-auto w-full max-w-md'>
      <div className='mb-6 text-center'>
        <h2 className='text-3xl font-bold'>Create an account</h2>
        <p>Enter your information to get started</p>
      </div>
      <form className=''>
        <div className='mb-2 p-1'>
          <CustomInput
            name='username'
            type='text'
            placeholder='Username'
            labalName='username'
            labelTitle='username'
            autoComplete='autoComplete'
          />
        </div>
        <div className='mb-2 p-1'>
          <CustomInput
            name='password'
            type='text'
            placeholder='Password'
            labalName='password'
            labelTitle='Password'
          />
        </div>
        <div className='mb-2 p-1'>
          <CustomInput
            name='repassword'
            type='text'
            placeholder='Retype Password'
            labalName='repassword'
            labelTitle='Retype Password'
          />
        </div>
        <div>
          <ClientButton disabled={false}>Sign up</ClientButton>
        </div>
      </form>
      <p className='text-center mt-4'>
        Already have an account? <Link href={'/login'}>Login</Link>{' '}
      </p>
    </div>
  );
}

export default SignupTemplate;
