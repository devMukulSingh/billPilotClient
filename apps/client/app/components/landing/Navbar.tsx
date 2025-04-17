import {
  SignedIn,
  SignedOut,
  useAuth,
  useClerk,
  UserButton,
} from '@clerk/remix';
import React from 'react';
import { Button } from '../ui/button';
import NavLinks from './NavLinks';
import { useNavigate } from '@remix-run/react';

type Props = {};

export default function Navbar({}: Props) {
  const { openSignIn, openSignUp } = useClerk();
  const navigate = useNavigate()
  return (
    <div
      className="
      items-center 
      justify-between
      h-24
      w-full
      rounded-full
      bg-violet-600
      sticky
      top-0
      px-8
      py-5
      text-white
      flex 
      shadow-xl
    "
    >
      <h1 className="cursor-pointer font-serif text-2xl font-semibold text-shadow-md">
        Bill pilot
      </h1>
      {/* <img className="h-32 w-32 object-contain" src="/logo-dark.png" /> */}

      <NavLinks />
      <div className="flex items-center gap-5">
        <SignedIn>
          <Button onClick={() => navigate('/create-bill')}>Open the App</Button>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Button onClick={() => openSignIn() } >Login</Button>
          <Button
            className="text-black"
            variant={'outline'}
            onClick={() => openSignUp()}
          >
            SignUp
          </Button>
        </SignedOut>
      </div>
    </div>
  );
}
