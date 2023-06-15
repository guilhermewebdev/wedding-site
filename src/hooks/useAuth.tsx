import React from "react";
import { apiClient } from "../lib/apiClient";
import { useRouter } from "next/router";
import Spinner from "components/Spinner";

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
    }, [state, setState])
    React.useEffect(checkAuth, []);
    return (
        <React.Profiler id="Auth" onRender={console.debug}>
            <AuthContextImpl.Provider value={{ ...state, checkAuth, }}>
                {children}
            </AuthContextImpl.Provider>
        </React.Profiler>
    )
}

export function Private(props: AuthProps) {
    const { isAuthenticated, loading } = useAuth();
    const { children } = props;
    const { push } = useRouter();
    React.useEffect(() => {
        if(!loading && !isAuthenticated) {
            push('/admin/login')
        }
    }, [isAuthenticated, loading, push])
    if (loading) return (
        <React.Profiler id="Private_Loading" onRender={console.debug}>
            <main>
                <Spinner />
            </main>
        </React.Profiler>
    )
    return (
        <React.Profiler id="Private_Permitted" onRender={console.debug}>
            {children}
        </React.Profiler>
    );
}

export default function useAuth() {
    return React.useContext(AuthContextImpl);
}