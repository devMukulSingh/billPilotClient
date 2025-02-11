import { SignIn } from '@clerk/remix';

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <SignIn
        forceRedirectUrl={'/create-bill'}
      />
    </div>
  );
}
