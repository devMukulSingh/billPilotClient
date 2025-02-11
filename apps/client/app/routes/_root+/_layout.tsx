import { getAuth } from '@clerk/remix/ssr.server';
import { LoaderFunction } from '@remix-run/node';
import { Outlet, redirect } from '@remix-run/react';
import Sidebar from '~/components/Sidebar';

type Props = {};

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect('/sign-in');
  }
  return {};
};

export default function RootLayout({}: Props) {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
}
