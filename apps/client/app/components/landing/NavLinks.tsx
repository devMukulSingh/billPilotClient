import { Link, useLocation } from '@remix-run/react';

type Props = {};

export default function NavLinks({}: Props) {
  const location = useLocation();
  const navlinks = [
    {
      title: 'Home',
      isActive: location.pathname === '/home',
    },
    {
      title: 'Features',
      isActive: location.pathname === '/features',
    },
    {
      title: 'Contact',
      isActive: location.pathname === '/contact',
    },
  ];
  return (
    <div className="flex gap-5">
      {navlinks.map((nav, index) => (
        <h1
          className="cursor-pointer font-medium text-lg sm:text-xl"
          key={index}
        >
          {nav.title}
        </h1>
      ))}
    </div>
  );
}
