import React from 'react';
import HeaderLayout from './header';
import FooterLayout from './footer';

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderLayout />
      {children}
      <FooterLayout />
    </>
  );
}

export default MainLayout;
