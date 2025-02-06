import { Outlet } from "@remix-run/react";
import Sidebar from "~/components/Sidebar";

type Props = {};

export default function RootLayout({}: Props) {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet/>
    </div>
  );
}
