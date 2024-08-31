import { Metadata } from "next";
import React from "react";
import './log.css';

export const metadata : Metadata = {
    title : "Bargain Boss | Login"
}

const Layout = ({
    children
}: {children : React.ReactNode}) => {
    return <>{children}</>
}

export default Layout;