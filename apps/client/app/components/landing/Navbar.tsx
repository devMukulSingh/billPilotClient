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
    flex 
    items-center 
    justify-between
    h-20
    w-screen
    bg-violet-600
    sticky
    top-0
    p-5
    text-white
    "
    >
      <img className="h-32 w-32 object-contain" src="/logo-dark.png" />

      <NavLinks />
      <div className="flex items-center gap-5">
        <SignedIn>
          <Button onClick={() => navigate("/create-bill")}>Open the App</Button>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Button onClick={() => openSignIn()}>Login</Button>
          <Button 
          className='text-black' 
          variant={"outline"} onClick={() => openSignUp()}>SignUp</Button>
        </SignedOut>
      </div>
    </div>
  );
}
