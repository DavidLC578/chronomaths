'use client';
import { useRouter } from 'next/navigation';
import useUser from '@/hooks/useUser';
import { logout } from '@/firebase/client';

export default function HomePage() {
    const router = useRouter();
    const { user, loading } = useUser(true);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    const goToGame = (mode: string) => {
        router.push(`/game?mode=${mode}`);
    };

    const handleLogout = async () => {
        try {
            await logout();
            // No need to manually redirect, the useUser hook will handle it for us
        } catch (error) {
            console.error('Error while logging out:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-black">
            <div className="w-full max-w-md space-y-6 text-center">
                <h1 className="text-2xl font-bold">Hola {user?.username || 'jugador'} 👋</h1>
                <p className="text-gray-500">¿Qué operación quieres practicar hoy?</p>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => goToGame('suma')}
                        className="py-4 bg-gray-100 hover:bg-gray-200 rounded-xl text-lg font-semibold shadow cursor-pointer"
                    >
                        ➕ Suma
                    </button>
                    <button
                        onClick={() => goToGame('resta')}
                        className="py-4 bg-gray-100 hover:bg-gray-200 rounded-xl text-lg font-semibold shadow cursor-pointer"
                    >
                        ➖ Resta
                    </button>
                    <button
                        onClick={() => goToGame('multiplicacion')}
                        className="py-4 bg-gray-100 hover:bg-gray-200 rounded-xl text-lg font-semibold shadow cursor-pointer"
                    >
                        ✖️ Multiplicación
                    </button>
                    <button
                        onClick={() => goToGame('division')}
                        className="py-4 bg-gray-100 hover:bg-gray-200 rounded-xl text-lg font-semibold shadow cursor-pointer"
                    >
                        ➗ División
                    </button>
                </div>

                <button
                    onClick={handleLogout}
                    className="mt-8 w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}
