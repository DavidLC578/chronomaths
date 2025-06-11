'use client';

import { useEffect, useState } from 'react';
import { User } from '@/interfaces/interfaces';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from '@/firebase/client';

export const USER_STATES = {
    NOT_LOGGED: null,
    NOT_KNOWN: undefined
} as const;

type UserState = User | null | undefined;

export default function useUser(requireAuth = false) {
    const [user, setUser] = useState<UserState>(USER_STATES.NOT_KNOWN);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged((firebaseUser: User | null) => {
            setUser(firebaseUser || USER_STATES.NOT_LOGGED);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (loading) return;
        
        if (requireAuth && user === USER_STATES.NOT_LOGGED) {
            router.replace('/auth');
        } else if (!requireAuth && user && user !== USER_STATES.NOT_LOGGED) {
            router.replace('/home');
        }
    }, [user, loading, requireAuth, router]);

    return {
        user,
        loading
    };
}