'use client';

import Image from 'next/image';
import { AuthError } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { loginWithGoogle, onAuthStateChanged } from '@/firebase/client';
import { User } from '@/interfaces/interfaces';
import Avatar from '@/components/Avatar/page';

export default function AuthPage() {
    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        onAuthStateChanged(setUser)
    }, []);

    const handleClick = () => {
        loginWithGoogle()
            .then((user: User) => {
                setUser(user);
            })
            .catch((error: AuthError) => {
                console.error('Error during login:', error.message);
            });
    }
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-white text-black">
            <div className="w-full max-w-md space-y-8 text-center">
                <div>
                    {/* <Image src="/logo.svg" alt="Logo" width={60} height={60} className="mx-auto mb-4" /> */}
                    <h1 className="text-3xl font-bold">Bienvenido</h1>
                    <p className="text-sm text-gray-500">Inicia sesión para entrenar tu mente</p>
                </div>
                {user === null && (
                    <button
                        onClick={handleClick}
                        className="flex items-center justify-center w-full gap-3 py-3 px-4 border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:shadow-lg transition duration-200"
                    >
                        <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
                        <span className="font-medium">Iniciar sesión con Google</span>
                    </button>
                )}
                {
                    user && user.avatar && (
                        <div>
                            <Avatar src={user.avatar} alt="Avatar" text={user.username} />
                        </div>
                    )
                }
                <footer className="pt-8 text-xs text-gray-400">
                    Hecho con 💡 por ti
                </footer>
            </div>
        </div>
    );
}
