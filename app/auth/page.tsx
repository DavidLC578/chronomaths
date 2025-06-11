'use client';

import Image from 'next/image';
import { loginWithGoogle } from '@/firebase/client';
import useUser from '@/hooks/useUser';

export default function AuthPage() {
    const { loading } = useUser(false);

    const handleClick = async () => {
        try {
            await loginWithGoogle();
        } catch (error) {
            console.error('Error during login:', error instanceof Error ? error.message : 'Unknown error');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }


    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-white text-black">
            <div className="w-full max-w-md space-y-8 text-center">
                <div>
                    {/* <Image src="/logo.svg" alt="Logo" width={60} height={60} className="mx-auto mb-4" /> */}
                    <h1 className="text-3xl font-bold">Bienvenido</h1>
                    <p className="text-sm text-gray-500">Inicia sesión para entrenar tu mente</p>
                </div>
                <button
                    onClick={handleClick}
                    className="flex items-center justify-center w-full gap-3 py-3 px-4 border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:shadow-lg transition duration-200"
                >
                    <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
                    <span className="font-medium">Iniciar sesión con Google</span>
                </button>
                <footer className="pt-8 text-xs text-gray-400">
                    Hecho con 💡 por ti
                </footer>
            </div>
        </div>
    );
}
