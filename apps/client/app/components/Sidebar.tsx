import { Link } from '@remix-run/react';
import Navlinks from './Navlinks';
import { SignIn, SignInButton, UserButton } from '@clerk/remix';
import { User } from '@clerk/remix/ssr.server';
import Logo from './Logo';

type Props = {};

export default function Sidebar({}: Props) {
  return (
    <div
      className="
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
      flex 
    "
    >
      <header
        className="
        gap-2 
        items-center 
        justify-between  
        px-5
        py-5
        flex
      "
      >
        <Link className="md:block hidden" to={'/'}>
          <Logo />
        </Link>
        <UserButton />
        {/* <h1>Welcome MK!</h1> */}
      </header>
      <Navlinks />
    </div>
  );
}
