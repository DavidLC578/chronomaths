export interface User {
    userId: string;
    username: string;
    avatar: string;
    email: string;
}

export interface UserScore {
    userId: string;
    username: string;
    avatar: string;
    maxScore: number;
    score: number;
    mode: string;
    date: string;
}

export interface GeneralResultsMap {
    [key: string]: UserScore | null;
}