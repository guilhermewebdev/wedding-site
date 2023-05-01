export interface Code {
    id: string;
    code: string;
}

export interface Guest {
    id: string;
    name: string;
    codeId: string;
    phone?: string;
    email?: string;
}