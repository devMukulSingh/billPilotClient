import { Link, useLocation } from '@remix-run/react'

type Props = {}

export default function NavLinks({}: Props) {
    const location = useLocation()
    const navlinks = [
      {
        title: 'HOME',
        isActive: location.pathname === '/home',
      },
      {
        title: 'FEATURES',
        isActive: location.pathname === '/features',

      },
      {
        title: 'CONTACT',
        isActive: location.pathname === '/contact',
      },
    ];
  return (
    <div className='flex gap-5'>
        {
            navlinks.map( (nav,index) => (
               <h1 
               className='cursor-pointer font-medium' 
               key={index}>{nav.title}</h1>
            ))
        }
    </div>
  )
}