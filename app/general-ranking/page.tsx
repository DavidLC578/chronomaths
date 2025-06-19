'use client';
import { getGeneralResults } from "@/firebase/client";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";

interface GeneralResultsMap {
    userId: string,
    username: string,
    avatar: string,
    maxScore: number,
    mode: string
}

export default function GeneralRankingPage() {
    const { loading } = useUser(true);
    const [results, setResults] = useState<GeneralResultsMap[]>([]);
    const [loadingResults, setLoadingResults] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const results = await getGeneralResults();
                setResults(results || []);
            } catch (error) {
                console.error('Error al cargar los resultados:', error);
            } finally {
                setLoadingResults(false);
            }
        };
        fetchResults();
    }, []);

    if (loading || loadingResults) {
        return (
            <main className="min-h-screen p-6 bg-white text-black">
                <h1 className="text-2xl font-bold text-center mb-8">🏅 Ranking general</h1>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen p-6 bg-white text-black">
            <section className="max-w-xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold text-center mb-8">🏅 Ranking general</h1>
                {results.length === 0 && (
                    <p className="text-center text-gray-500">No hay resultados disponibles</p>
                )}
                {results.length > 0 && (
                    results?.map((result) => (
                        <article
                            key={`${result.userId}-${result.mode}`}
                            className="border border-gray-200 p-4 rounded-xl shadow-sm bg-gray-50"
                        >
                            <h2 className="text-xl font-semibold capitalize">️⏱️ Modo: {result.mode}</h2>
                            <ul className="mt-2 text-gray-700 space-y-1">
                                <li>🏆 Jugador: <strong>{result.username}</strong></li>
                                <li>🏅 Máxima puntuación: <strong>{result.maxScore}</strong></li>
                            </ul>
                        </article>
                    ))
                )}
            </section>
        </main>
    );
}