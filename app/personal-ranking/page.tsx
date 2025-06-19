// app/ranking-personal/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { getUserResults } from '@/firebase/client'
import useUser from '@/hooks/useUser';

const modes = ['suma', 'resta', 'multiplicación', 'división'];

type OperationMode = 'suma' | 'resta' | 'multiplicación' | 'división';

type UserResult = {
    maxScore: number;
    lastScore: number;
    date: string;
};

type ResultsMap = {
    [key in OperationMode]?: UserResult;
};

export default function PersonalRankingPage() {
    const { user, loading } = useUser(true);
    const [results, setResults] = useState<ResultsMap>({});
    const [loadingResults, setLoadingResults] = useState(true);

    useEffect(() => {
        if (user?.userId) {
            getUserResults(user.userId)
                .then(setResults)
                .finally(() => setLoadingResults(false));
        }
    }, [user?.userId]);

    if (loading || loadingResults) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </main>
        );
    }

    return (
        <main className="min-h-screen p-6 bg-white text-black">
            <section className="max-w-xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold text-center">🏅 Tu ranking personal</h1>

                {modes.map((mode) => {
                    const result = results[mode as OperationMode];

                    return (
                        <article
                            key={mode}
                            className="border border-gray-200 p-4 rounded-xl shadow-sm bg-gray-50"
                        >
                            <h2 className="text-xl font-semibold capitalize">{mode}</h2>
                            {result ? (
                                <ul className="mt-2 text-gray-700 space-y-1">
                                    <li>🔝 Máxima puntuación: <strong>{result.maxScore}</strong></li>
                                    <li>🕘 Última puntuación: <strong>{result.lastScore}</strong></li>
                                    <li className="text-sm text-gray-400">
                                        Última vez: {new Date(result.date).toLocaleString()}
                                    </li>
                                </ul>
                            ) : (
                                <p className="text-gray-400 italic mt-2">Aún no has jugado esta operación.</p>
                            )}
                        </article>
                    );
                })}
            </section>
        </main>
    );
}
