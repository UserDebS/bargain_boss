'use client'

import Login from "@/components/Login";
import Register from "@/components/Register";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const [login, setLogin] = useState(false);
    const params = useSearchParams();
    return (
        <div className="form-page w-lvw h-lvh flex justify-center items-center overflow-hidden">
            <div className="form-submission w-1/4 h-1/2 min-w-80 bg-white drop-shadow-md rounded-2xl overflow-hidden">
                <div className="h-12 w-full flex justify-center items-center gap-2">
                    <button className={"p-2 rounded shadow-inner shadow-gray-600 font-bold " + ((login)? "bg-green-900 text-green-50" : "text-green-800")} onClick={e => setLogin(true)}>Login</button>
                    <button className={"p-2 rounded shadow-inner shadow-gray-600 font-bold " + ((login)? "text-green-800" : "bg-green-900 text-green-50")} onClick={e => setLogin(false)}>Sign Up</button>
                </div>
                <div className="px-5 py-4" style={{
                    height: "calc( 100% - 96px )"
                }}>
                    {
                        (login)? <Login /> : <Register />
                    }
                </div>
                {
                    (params.has('existed'))?
                    <div id="alert" className="alert-fade h-12 text-center bg-red-200 font-bold py-3 text-red-700">
                        Email ID already exists
                    </div>
                    :(params.has('invalid'))?
                    <div id="alert" className="alert-fade h-12 text-center bg-red-200 font-bold py-3 text-red-700">
                        Invalid Email/ Password
                    </div>
                    : ""
                }
            </div>
        </div>
    );
}
