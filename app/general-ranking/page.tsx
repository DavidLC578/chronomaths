'use client';
import { getGeneralResults } from "@/firebase/client";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";

import { GeneralResultsMap } from "@/interfaces/interfaces";

export default function GeneralRankingPage() {
    const { loading } = useUser(true);
    const [results, setResults] = useState<GeneralResultsMap | null>(null);
    const [loadingResults, setLoadingResults] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const results = await getGeneralResults();
                setResults(results);
            } catch (error) {
                console.error('Error al cargar los resultados:', error);
            } finally {
                setLoadingResults(false);
            }
        };
        fetchResults();
    }, []);

    if (loading || loadingResults || !results) {
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
                {!results || Object.keys(results).length === 0 ? (
                    <p className="text-center text-gray-500">No hay resultados disponibles</p>
                ) : (
                    Object.entries(results).map(([mode, result]) => (
                        result ? (
                            <article
                                key={`${result.userId}-${mode}`}
                                className="border border-gray-200 p-4 rounded-xl shadow-sm bg-gray-50"
                            >
                                <h2 className="text-xl font-semibold capitalize">️⏱️ Modo: {mode}</h2>
                                <ul className="mt-2 text-gray-700 space-y-1">
                                    <li>🏆 Jugador: <strong>{result.username}</strong></li>
                                    <li>🏅 Máxima puntuación: <strong>{result.maxScore}</strong></li>
                                </ul>
                            </article>
                        ) : (
                            <article key={mode} className="border border-gray-200 p-4 rounded-xl shadow-sm bg-gray-50">
                                <h2 className="text-xl font-semibold capitalize">️⏱️ Modo: {mode}</h2>
                                <p className="mt-2 text-gray-500">Sin resultados aún</p>
                            </article>
                        )
                    ))
                )}
            </section>
        </main>
    );
}