'use client';
import Link from 'next/link';
import SignoutButton from '@/components/template/auth/signout-button';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/util';

function HeaderLayout() {
  const { data: session, status } = useSession();
  return (
    <nav className='flex justify-between py-2'>
      <ul className='flex gap-4'>
        <li>
          <Link
            href='/'
            className='block py-2 pr-4 duration-300 hover:bg-slate-100'
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
      <div className={cn('h-10 w-28 rounded-sm bg-slate-100')}>
        {session?.user && <SignoutButton>{'Sign Out'}</SignoutButton>}

        {!session && status !== 'loading' && (
          <Link
            href={'/login'}
            className='bg-slate-0 block w-full rounded-sm px-5 py-2 text-center text-slate-700 duration-300 hover:bg-slate-50'
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}

export default HeaderLayout;
