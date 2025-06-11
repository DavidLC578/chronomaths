// pages/game.tsx
'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useUser from '@/hooks/useUser';
import { saveResult } from '@/firebase/client';

const GAME_DURATION = 60;

export default function GamePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode');
    const { user } = useUser(true);

    const [countdown, setCountdown] = useState(3);
    const [gameStarted, setGameStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Countdown before starting
    useEffect(() => {
        if (!mode) return;

        if (countdown > 0) {
            const interval = setInterval(() => setCountdown((c) => c - 1), 1000);
            return () => clearInterval(interval);
        } else {
            setGameStarted(true);
        }
    }, [countdown, mode]);

    // Save result when game ends
    const saveGameResult = useCallback(async () => {
        if (!user) return;

        try {
            await saveResult({
                userId: user.userId || '',
                username: user.username || 'Jugador',
                avatar: user.avatar || '',
                score,
                mode: mode || 'desconocido',
                date: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error al guardar el resultado:', error);
        }
    }, [user, score, mode]);

    // Game timer
    useEffect(() => {
        if (!gameStarted) return;
        if (timeLeft <= 0) {
            setGameOver(true);
            saveGameResult();
            return;
        }
        const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        return () => clearInterval(interval);
    }, [gameStarted, timeLeft, saveGameResult]);

    // Generate new operation
    const newQuestion = () => {
        const n1 = Math.floor(Math.random() * 50);
        const n2 = Math.floor(Math.random() * 50);
        setA(n1);
        setB(n2);
        setInput('');
        inputRef.current?.focus();
    };

    // First question
    useEffect(() => {
        if (gameStarted) newQuestion();
    }, [gameStarted]);

    // Check answer
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const result = parseInt(input);
        let correct = false;

        switch (mode) {
            case 'suma':
                correct = result === a + b;
                break;
            case 'resta':
                correct = result === a - b;
                break;
            case 'multiplicacion':
                correct = result === a * b;
                break;
            case 'division':
                correct = result === Math.floor(a / b); // puedes adaptar esto
                break;
            default:
                break;
        }

        if (correct) {
            setScore((s) => s + 1);
            newQuestion();
        } else {
            setInput('');
        }
    };

    if (!mode) return <p className="p-4">Cargando...</p>;

    // Game over view
    if (gameOver) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-4 text-center">
                <h1 className="text-3xl font-bold mb-4">⏱️ ¡Tiempo agotado!</h1>
                <p className="text-xl mb-2">Has resuelto <strong>{score}</strong> operaciones correctamente.</p>
                <button
                    onClick={() => router.push(`/home`, { scroll: false })}
                    className="mt-4 bg-black text-white py-2 px-6 rounded-xl hover:opacity-90"
                >
                    Jugar otra vez
                </button>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-white text-black px-4">
            {!gameStarted ? (
                <div className="text-5xl font-bold">{countdown > 0 ? countdown : '¡Ya!'}</div>
            ) : (
                <>
                    <button
                        onClick={() => router.push('/home')}
                        className="absolute cursor-pointer top-4 right-4 p-2 text-gray-500 hover:text-black transition-colors"
                        title="Salir del juego"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="w-full max-w-md space-y-6">
                        <div className="w-full flex flex-col space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">👤 {user?.username || 'Jugador'}</span>
                                <div className="flex space-x-4">
                                    <span className="text-sm text-gray-500">⏳ {timeLeft}s</span>
                                    <span className="text-sm text-gray-500">✅ {score}</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center text-4xl font-bold">
                            {a} {getSymbol(mode as string)} {b} = ?
                        </div>

                        <form onSubmit={handleSubmit}>
                            <input
                                ref={inputRef}
                                type="number"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full text-center text-2xl border-b-2 border-black focus:outline-none py-2"
                                autoFocus
                                inputMode="numeric"
                                pattern="[0-9]*"
                            />
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}

// Show operation symbol
function getSymbol(mode: string) {
    switch (mode) {
        case 'suma':
            return '+';
        case 'resta':
            return '−';
        case 'multiplicacion':
            return '×';
        case 'division':
            return '÷';
        default:
            return '?';
    }
}
