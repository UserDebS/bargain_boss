import { type FormEvent, useState } from "react";
import {useRouter} from "next/navigation";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const router = useRouter();

    const handleSubmit = async(e : FormEvent) => {
        e.preventDefault();
        if(password1 !== password2) return;
        const response = await fetch('/api/register', {
            method : 'POST',
            body : JSON.stringify({
                email : email,
                password : password1
            })
        }).then(res => res.json())
        .then((data : {status : number}) => data.status);
        if(response === 200) {
            router.push('/home');
        } else {
            router.push('/login?existed=1');
        }
    }
    return ( 
    <form onSubmit={handleSubmit} className="w-full h-full flex flex-col justify-start items-center gap-y-1">
        <input
        className="w-full px-2 m-0 h-12 border-green-950 border-2 rounded " 
        placeholder="Email"
        type="email"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required /> 
        <input
        className="w-full px-2 m-0 h-12 border-green-950 border-2 rounded" 
        placeholder="Password"
        type="password"
        name="password1"
        value={password1} 
        onChange={e => setPassword1(e.target.value)}
        required/> 
        <input
        className="w-full px-2 m-0 h-12 border-green-950 border-2 rounded" 
        placeholder="Password"
        type="password" 
        name="password2" 
        value={password2}
        onChange={e => setPassword2(e.target.value)}
        required/>
        <button type="submit" className="p-2 rounded shadow-inner shadow-gray-600 font-bold w-1/4 text-green-800 active:bg-green-900 active:text-green-50">Register</button>
    </form> );
}
 
export default Register;