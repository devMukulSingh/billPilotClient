import { Link, useLocation } from '@remix-run/react';
import { Package, Plus, PlusCircle, ScrollText, ShoppingBagIcon } from 'lucide-react';

type Props = {};

export default function Navlinks({}: Props) {
  const location = useLocation();
  const navlinks = [
    {
      title: 'Create bill',
      link: '/create-bill',
      isActive: location.pathname === '/create-bill',
      icon: PlusCircle,
    },
    {
      title: 'All bills',
      link: '/bills',
      isActive: location.pathname === '/bills',
      icon: ScrollText,
    },
    {
      title: 'Products',
      link: '/products',
      isActive: location.pathname === '/products',
      icon: ShoppingBagIcon,
    },
    {
      title: 'Domains',
      link: '/domain',
      isActive: location.pathname === '/domain',
      icon: Package,
    },
    {
      title: 'Distributors',
      link: '/distributor',
      isActive: location.pathname === '/distributor',
      icon: Package,
    },
  ];
  return (
    <div className="flex w-full flex-col gap-2">
      {navlinks.map((navlink, index) => (
        <Link
          className={`
            flex
            px-5
            py-2
            gap-2
            md:justify-normal
            justify-center
            hover:bg-violet-400
            ${navlink.isActive ? 'bg-violet-400' : ''}
           `}
          to={navlink.link}
          key={index}
        >
          {/* <div className=''> */}
            <navlink.icon />
            <h1 className="md:block hidden">{navlink.title}</h1>
          {/* </div> */}
        </Link>
      ))}
    </div>
  );
}
