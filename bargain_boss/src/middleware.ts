'use server';
import { NextRequest, NextResponse } from "next/server";
import { authusingtoken } from "./utils/auth";


const MiddleWare = async(req: NextRequest) => {
    if (req.nextUrl.pathname == "/") {
        if(req.cookies.has('auth_token')) {
            const response = await authusingtoken(req.cookies.get('auth_token')?.value as string)
            if(response === 400) return NextResponse.next();
            const nextresponse = NextResponse.redirect(req.nextUrl.origin + '/home');
            nextresponse.cookies.set('auth_token', response, {
                maxAge : 4 * 24 * 3600 * 1000,
                secure : true
            });
            return nextresponse;
        }
    }
    return NextResponse.next();
}

export default MiddleWare;