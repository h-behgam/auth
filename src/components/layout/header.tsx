import Link from 'next/link';

function HeaderLayout() {
  return (
    <nav className='p-2'>
      <ul className='flex gap-4'>
        <li>
          <Link href='/' className='block px-4 py-2 duration-300 hover:bg-slate-100'>Home</Link>
        </li>
        <li>
          <Link href='/login' className='block px-4 py-2 duration-300 hover:bg-slate-100'>Login</Link>
        </li>
        <li>
          <Link href='/signup' className='block px-4 py-2 duration-300 hover:bg-slate-100'>Signup</Link>
        </li>
        <li>
          <Link href='/dashboard' className='block px-4 py-2 duration-300 hover:bg-slate-100'>Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderLayout;
