import { Outlet } from '@remix-run/react';
import { ReactNode } from 'react';
import BillsHeader from '~/components/bill/Header';
import SearchBar from '~/components/bill/Header';

export default function BillLayout({ children }: { children: ReactNode }) {
  return (
    <div className=" bg-slate-200">
      <BillsHeader />
      <Outlet />
    </div>
  );
}
