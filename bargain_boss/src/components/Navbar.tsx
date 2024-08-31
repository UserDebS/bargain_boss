'use client';

import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    if(pathname === '/login' || pathname === '/home' || pathname.includes('/home')) return <></>;
    return (
        <nav>
            <div className="h-16 w-screen flex justify-end items-center px-5">
                <ul className="flex">
                    <li><a href="/login" className="border-2 text-xl rounded p-1 px-3 border-green-950 text-green-900 pointer-events-auto active:bg-green-950 active:text-white">Login</a></li>
                </ul>
            </div>
        </nav>
    );
}