import React from "react";

export interface AuthContext {
    isAuthenticated: boolean;
    loading: boolean;
}

export interface AuthProps {
    children: React.ReactNode;
}

const AuthContextImpl = React.createContext<AuthContext>({
    isAuthenticated: false,
    loading: false,
})

export function Auth(props: AuthProps) {
    const { children } = props;
    const [state, setState] = React.useState<AuthContext>({
        isAuthenticated: false,
        loading: false,
    })
    return (
        <AuthContextImpl.Provider value={state}>
            {children}
        </AuthContextImpl.Provider>
    )
}

export default function useAuth() {

}