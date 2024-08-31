import { authusingpass } from "@/utils/auth";
import { cookies } from "next/headers";

export const POST = async(req: Request) => {
    const data = await req.json();
    const email: string = data.email as string, 
          password: string = data.password as string,
          auth = await authusingpass(email, password);
    if(auth === 400) return new Response(JSON.stringify({
        status : 400
    }));
    cookies().set('auth_token', auth, {
        maxAge : 4 * 24 * 3600 * 1000,
        secure : true
    });
    return new Response(JSON.stringify({
        status : 200
    }));
}
