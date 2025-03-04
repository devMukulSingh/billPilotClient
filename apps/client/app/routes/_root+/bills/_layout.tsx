import { Outlet } from '@remix-run/react';
import { ReactNode } from 'react';
import BillsHeader from '~/components/bills/Header';
import SearchBar from '~/components/bills/Header';

export default function BillLayout({ children }: { children: ReactNode }) {
  return (
    <div className=" bg-slate-200">
      <BillsHeader />
      <Outlet />
    </div>
  );
}
