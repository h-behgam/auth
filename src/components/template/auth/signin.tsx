import ClientButton from '@/components/global/client-button';
import CustomInput from '@/components/global/custom-input';
import { signIn } from '@/lib/next-auth';
import Link from 'next/link';

function SigninTemplate() {
  const handlerSubmit = (formData: FormData) => {
    signIn('credentials', {formData, callbackUrl: '/dashboard'});
  }
  return (
    <div className='mx-auto w-full max-w-md'>
      <div className='mb-6 text-center'>
        <h2 className='text-3xl font-bold'>Login</h2>
        <p>Enter your email below to login to your account</p>
      </div>
      <form className='' action={async (formData) => {
        "use server"
        const { username, password } = Object.fromEntries(formData)
        console.log(username, password );
        
        const a = await signIn("credentials", {username, password, callbackUrl: "/dashboard"})
        console.log('aaaaaaaaaaaa',a);
        
      }}>
        <div className='mb-2 p-1'>
          <CustomInput
            name='username'
            type='text'
            placeholder='Username'
            labalName='username'
            labelTitle='user'
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
