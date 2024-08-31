import { encryptionsalt, generateRandomString } from '@/utils/encryption';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    const supabase = createClient();
    const data = await req.json();
    const email = data.email as string, 
          password = data.password as string;

    try {
        const salt = generateRandomString(10);
        const newtoken = generateRandomString(20);
        await supabase.from('user_details').insert({
            email : email,
            password: encryptionsalt(password, salt),
            salt : salt,
            token : newtoken
        })
        cookies().set('auth_token', newtoken, {
            maxAge : 4 * 24 * 3600 * 1000,
            secure : true
        })
        return new Response(JSON.stringify({
            status : 200
        }))
    } catch(error) {
        return new Response(JSON.stringify({
            status : 201
        }))
    }
}
