import Link from 'next/link';
import SignoutButton from '@/lib/auth/signout-button';
import { auth } from '@/lib/auth/next-auth';

async function HeaderLayout() {
  const session = await auth();
  return (
    <nav className='flex justify-between p-2'>
      <ul className='flex gap-4'>
        <li>
          <Link
            href='/'
            className='block px-4 py-2 duration-300 hover:bg-slate-100'
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href='/login'
            className='block px-4 py-2 duration-300 hover:bg-slate-100'
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            href='/signup'
            className='block px-4 py-2 duration-300 hover:bg-slate-100'
          >
            Signup
          </Link>
        </li>
        <li>
          <Link
            href='/dashboard'
            className='block px-4 py-2 duration-300 hover:bg-slate-100'
          >
            Dashboard
          </Link>
        </li>
      </ul>
      {session?.user ? (
        <SignoutButton className='w-max rounded-sm bg-slate-100 p-1'>
          {'Sign Out'}
        </SignoutButton>
      ) : (
        <Link href={'/login'} className='w-max rounded-sm bg-slate-100 p-1'>Sign in</Link>
      )}
    </nav>
  );
}

export default HeaderLayout;
