import React from "react";
import { apiClient } from "../lib/apiClient";
import { useRouter } from "next/router";

export interface AuthContext {
    isAuthenticated: boolean;
    loading: boolean;
    checkAuth: () => void;
}

export interface AuthProps {
    children?: React.ReactNode;
}

const AuthContextImpl = React.createContext<AuthContext>({
    isAuthenticated: false,
    loading: false,
    checkAuth: () => null,
})

export function Auth(props: AuthProps) {
    const { children } = props;
    const [state, setState] = React.useState<Omit<AuthContext, 'checkAuth'>>({
        isAuthenticated: false,
        loading: true,
    });
    const checkAuth = React.useCallback(() => {
        apiClient.get('/admin/me').then(async (response) => {
            const { status } = response;
            const newState = { loading: false, isAuthenticated: status === 200 };
            setState(newState);
        })
        .catch(() => setState({ ...state, loading: false, }))
    }, [])
    
    React.useEffect(() => {
        checkAuth()
    }, []);
    return (
        <AuthContextImpl.Provider value={{ ...state, checkAuth, }}>
            {children}
        </AuthContextImpl.Provider>
    )
}

export function IsAuthenticated(props: AuthProps) {
    const { isAuthenticated, loading } = useAuth();
    const { children } = props;
    const { push } = useRouter();
    React.useEffect(() => {
        if(!loading && !isAuthenticated) {
            push('/admin/login')
        }
    }, [isAuthenticated, loading])
    if (loading) return (
        <main>Carregando...</main>
    )
    return (
        <>{children}</>
    );
}

export default function useAuth() {
    return React.useContext(AuthContextImpl);
}