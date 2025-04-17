import { Link } from '@remix-run/react';
import { contactLinks, socialLinks } from 'lib/constants';

type Props = {};

export default function LandingFooter({}: Props) {
  return (
    <div className="h-[20rem] bg-violet-200  px-10 pt-20 pb-5   flex flex-col shadow-xl rounded-xl">
      <div className="flex justify-center gap-20">
        <div className="space-y-3">
          <h1 className="font-semibold">Contact</h1>
          <div className="space-y-1">
            {contactLinks.map((contact, index) => (
              <div
                className="cursor-pointer flex gap-2 items-center hover:underline"
                key={index}
              >
                <contact.icon />
                <p className="text-sm">{contact.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="font-semibold"> Social</h1>
          <div className="space-y-1">
            {socialLinks.map((social, index) => (
              <Link
                target="_blank"
                to={social.value}
                className="flex gap-2 items-center hover:underline"
                key={index}
              >
                <social.icon size={25} />
                <p className="text-sm">{social.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <h1 className="mt-auto text-sm text-center">@Copyright BillPilot 2025. All rights reserved</h1>
    </div>
  );
}
