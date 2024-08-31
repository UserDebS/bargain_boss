import { createServerClient , type CookieOptions} from "@supabase/ssr";
import { Vujahday_Script } from "next/font/google";
import { cookies } from "next/headers";

export const createClient = () => {
    const cookieStore = cookies();
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string, 
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
        {
            cookies : {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiestoSet) {
                    try {
                        cookiestoSet.forEach(({name, value, options}) => {
                            cookieStore.set(name, value, options);
                        })
                    } catch (error) {
                        
                    }
                }
            }
        } 
    );
}