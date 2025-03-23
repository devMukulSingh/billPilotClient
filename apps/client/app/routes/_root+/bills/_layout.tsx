import { Outlet } from '@remix-run/react';
import BillsHeader from '~/components/bill/Header';

export default function BillLayout() {
  return (
    <div className=" bg-slate-200">
      <BillsHeader />
      <Outlet />
    </div>
  );
}
