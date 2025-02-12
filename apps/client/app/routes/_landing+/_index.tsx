import { ReactNode } from 'react';
import Navbar from '~/components/landing/Navbar';

export default function IndexLayout({ children }: { children: ReactNode }) {
  return (
  <div className="font-sans bg-obcPrimary ">
    <Navbar/>
  </div>
  )
}
