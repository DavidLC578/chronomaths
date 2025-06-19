import { User, UserScore } from '../interfaces/interfaces';

declare module '@/firebase/client' {
    // Tipos para los resultados
    interface UserResult {
        maxScore: number;
        lastScore: number;
        date: string;
    }

    // Tipos para los parámetros de las funciones
    interface SaveResultParams {
        userId: string;
        username: string;
        avatar: string;
        score: number;
        mode: string;
        date: string | Date;
    }

    // Estado de autenticación
    export const onAuthStateChanged: (callback: (user: User | null) => void) => () => void;
    
    // Autenticación
    export const loginWithGoogle: () => Promise<User>;
    export const logout: () => Promise<boolean>;
    
    // Operaciones con resultados
    export const saveResult: (params: SaveResultParams) => Promise<{
        id: string;
        userId: string;
        username: string;
        avatar: string;
        score: number;
        maxScore: number;
        mode: string;
        date: string;
    }>;
    
    export const getUserResults: (userId: string) => Promise<{
        [key: string]: UserResult | undefined;
    }>;
    
    export const getGeneralResults: () => Promise<{
        [key: string]: UserScore | null;
    }>;
}
