import { Link } from '@remix-run/react';
import Navlinks from './Navlinks';
import { SignIn, SignInButton, UserButton } from '@clerk/remix';
import { User } from '@clerk/remix/ssr.server';

type Props = {};

export default function Sidebar({}: Props) {
  return (
    <div
      className="
    flex 
    bg-violet-500 
    text-white 
    flex-col 
    gap-5 
    h-screen 
    sticky 
    left-0 
    top-0
    w-[5rem]  
    items-center
    md:items-stretch
    md:w-[15rem]
    "
    >
      <header
        className="flex
       gap-2 
       items-center 
       justify-between  
      px-5
      py-5
      "
      >
        <Link className="md:block hidden" to={'/'}>
          <img
            className="h-20  w-20 object-contain"
            src="/logo-dark.png"
            alt="logo"
          />
        </Link>
        <UserButton />
        {/* <h1>Welcome MK!</h1> */}
      </header>
      <Navlinks />
    </div>
  );
}
