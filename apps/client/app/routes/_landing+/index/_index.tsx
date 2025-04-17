import { useNavigate } from '@remix-run/react';
import { Button } from '~/components/ui/button';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="font-sans flex flex-col items-center h-[calc(100vh-7.5rem)]  justify-center p-5 gap-10">
      {/* <div> */}
      <div className="space-y-2">
        <h1 className="sm:text-8xl text-5xl font-semibold text-center">
          Simplify Your Billing
        </h1>
        <h1 className="sm:text-4xl text-xl font-semibold text-center">
          Manage All Distributor Invoices in One Place
        </h1>
      </div>
      <Button
        onClick={() => navigate('/create-bill')}
        className="px-10 shadow-xl text-lg sm:text-xl py-8 rounded-full"
      >
        Get started for FREE!
      </Button>
      {/* </div> */}
      {/* <h1>
        Stay on top of every bill from multiple distributors. Track, organize,
        and manage invoices seamlessly—built for retailers.
      </h1>
      <h1>
        Centralized dashboard for all incoming bills Easy tracking of due dates
        and payment status Organized records by distributor Designed
        specifically for retail businesses
      </h1>
      <h1>Start Managing Your Bills Smarter — Get Started Free</h1> */}
    </div>
  );
}
