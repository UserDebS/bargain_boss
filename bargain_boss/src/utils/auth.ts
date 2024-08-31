import 'server-only'
import { createClient } from "./supabase/server"
import { encryptionsalt, generateRandomString } from './encryption';

export const authusingpass = async (email: string, password: string) => {
    const supabase = createClient();
    const { data , error } = await supabase.from('user_details').select("password, salt")
        .eq('email', email)
        .single(),
        salt = data?.salt as string,
        storepass = data?.password as string;
    if(error !== null) return 400;
    const encrypted = encryptionsalt(password, salt);
    if(encrypted !== storepass) return 400;
    const newtoken = generateRandomString(20),
        newsalt = generateRandomString(10),
        newpass = encryptionsalt(password, newsalt);
    await supabase.from('user_details').update({
        'token' : newtoken,
        'password': newpass,
        'salt' : newsalt    
    }).eq('email', email);
    return newtoken;
}

export const authusingtoken = async (token: string) => {
    const supabase = createClient();
    const { data } = await supabase.from('user_details').select("token").eq("token", token).single();
    if(data === null) return 400;
    const newtoken = generateRandomString(20);
    await supabase.from('user_details').update({'token' : newtoken}).eq('token', token);
    return newtoken;
}