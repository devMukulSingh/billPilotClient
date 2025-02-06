import { Link, useLocation } from "@remix-run/react";

type Props = {}

export default function Navlinks({}: Props) {
    const location = useLocation();
    const navlinks = [
      {
        title: "Create bill",
        link: "/create-bill",
        isActive: location.pathname === "/create-bill",
      },
      {
        title: "All bills",
        link: "/bills",
        isActive: location.pathname === "/bills",
      },
    ];
  return (
    <div className="flex flex-col gap-2">
      {navlinks.map((navlink, index) => (
        <Link
          className={`
                    px-2
                    py-2
                    rounded-md
                    hover:bg-violet-400
                    ${navlink.isActive ? "bg-violet-400" : ""}
                    `}
          to={navlink.link}
          key={index}
        >
          {navlink.title}
        </Link>
      ))}
    </div>
  );
}