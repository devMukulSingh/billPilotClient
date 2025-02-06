import { Outlet } from "@remix-run/react";
import { ReactNode } from "react";

export default function BillLayout({children}:{children:ReactNode}){
    return(
        <>
            layout 
            <Outlet/>
        </>
    )
}