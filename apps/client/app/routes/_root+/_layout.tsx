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
  if(typeof window!=='undefined') localStorage.setItem('userId',JSON.stringify(userId));
  return {};
};

export default function RootLayout({}: Props) {
  return (
    <div className="flex max-h-screen  overflow-hidden ">
      <Sidebar />
      <div
        className="     
        w-[calc(100vw-5rem)] 
        bg-slate-200
        md:w-[calc(100vw-15rem)] 

      "
      >
        <Outlet />
      </div>
    </div>
  );
}
