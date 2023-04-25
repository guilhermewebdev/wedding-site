export interface Sessions {
    token: string;
    browser?: string;
}

export interface Admin {
    id: string;
    name: string;
    email: string;
    password: string;
    session: Sessions[];
}