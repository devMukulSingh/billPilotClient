import { Outlet, redirect } from '@remix-run/react';
import LandingFooter from '~/components/landing/LandingFooter';
import Navbar from '~/components/landing/Navbar';

type Props = {};

export default function LandingLayout({}: Props) {
  return (
    <div className='md:p-10'>
      <Navbar />
      <Outlet />
      <LandingFooter/>
    </div>
  );
}
