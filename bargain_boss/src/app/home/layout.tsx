import { Metadata } from "next";

export const metadata: Metadata = {
    title : "Bargain Boss | Home"
}

export default function Layout({children}: {children : React.ReactNode}) {
    return <>{children}</>;
}