'use client';

import { signOut } from 'next-auth/react';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { ReactNode } from 'react';

interface InfoButtonProps {
  children: ReactNode;
  className?: string;
}

export default function SignoutButton({
  children,
  className,
}: InfoButtonProps) {
  const clickHandler = async () => {
    try {
      await signOut({ redirectTo: '/login' });
    } catch (error) {
      if (isRedirectError(error)) {
        console.log('error in logout auth is : ', error);
        throw error;
      }
    }
  };
  const defaultClassName =
    'w-full rounded-sm bg-slate-50 px-5 py-2 text-slate-700 duration-300 hover:bg-slate-100';
  return (
    <button
      onClick={clickHandler}
      disabled={false}
      className={className ? className : defaultClassName}
    >
      {children}
    </button>
  );
}
