export interface Session {
    token: string;
    browser?: string;
    dateTime: Date;
}

export interface Admin {
    id: string;
    name: string;
    email: string;
    password: string;
    sessions: Session[];
}