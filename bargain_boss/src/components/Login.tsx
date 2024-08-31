'use client';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

const Login = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res => res.json())
        .then((data : {status : number}) => data.status);
        if(response === 400) {
            router.push('/login?invalid=1');
            return;
        }
        setEmail('');
        setPassword('');
        router.push('/home');
    }

    return (
        <form onSubmit={handleSubmit} className="w-full h-full flex flex-col justify-start items-center gap-y-1">
            <input
                type="email"
                className="w-full px-2 m-0 h-12 border-green-950 border-2 rounded " 
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                className="w-full px-2 m-0 h-12 border-green-950 border-2 rounded " 
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" className="p-2 rounded shadow-inner shadow-gray-600 font-bold w-1/4 text-green-800 active:bg-green-900 active:text-green-50">Log In</button>
        </form>
    );
}

export default Login;