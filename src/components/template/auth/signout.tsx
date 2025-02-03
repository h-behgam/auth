// 'use client';

import Link from 'next/link';
import SignoutButton from './signout-button';
// import { useEffect, useState } from 'react';
// import { cookies } from 'next/headers';

function Signout({isAuthenticated}: {isAuthenticated: boolean}) {
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean|null>(null);

    // useEffect(() => {
    //   const checkAuthStatus = async () => {
    //     try {
    //         const res = await fetch("/api/auth/status");
    //         const data = await res.json();
    //         setIsAuthenticated(data.isAuthenticated);
    //     } catch (err) {
    //         console.error("Error fetching auth status:", err);
    //         setIsAuthenticated(false);
    //     }
    // };
    // checkAuthStatus();
    // }, []);
console.log('isAuthenticated', isAuthenticated);

  if (isAuthenticated) {
    return (
      <SignoutButton className='w-max rounded-sm bg-slate-100 p-1'>
        {'Sign Out'}
      </SignoutButton>
    );
  }
  if (isAuthenticated === false) {
  return (
    <Link href={'/login'} className='w-max rounded-sm bg-slate-100 p-1'>
      Sign in
    </Link>
  );
}
}

export default Signout;
