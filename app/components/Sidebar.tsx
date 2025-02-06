import { Link } from "@remix-run/react";
import Navlinks from "./Navlinks";

type Props = {};

export default function Sidebar({}: Props) {
  return (
    <div className="px-2 flex bg-violet-500 text-white flex-col gap-5 w-[15rem]  h-screen sticky left-0 top-0">
      <header className="flex gap-2 items-center">
        <Link to={"/"}>
          <img
            className="h-20 w-20 object-contain"
            src="/logo-dark.png"
            alt="logo"
          />
        </Link>
        <h1>Welcome MK!</h1>
      </header>
      <Navlinks />
    </div>
  );
}
