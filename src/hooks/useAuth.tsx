import React from "react";
import { apiClient } from "../lib/apiClient";

export interface AuthContext {
    isAuthenticated: boolean;
    loading: boolean;
}

export interface AuthProps {
    children?: React.ReactNode;
}

const AuthContextImpl = React.createContext<AuthContext>({
    isAuthenticated: false,
    loading: false,
})

export function Auth(props: AuthProps) {
    const { children } = props;
    const [state, setState] = React.useState<AuthContext>({
        isAuthenticated: false,
        loading: true,
    });
    React.useEffect(() => {
        apiClient.get('/admin/me').then(async (response) => {
            const { status } = response;
            const newState = { loading: false, isAuthenticated: status === 200 };
            setState(newState);
        })
        .catch(() => setState({ ...state, loading: false, }))
    }, []);
    return (
        <AuthContextImpl.Provider value={state}>
            {children}
        </AuthContextImpl.Provider>
    )
}

export default function useAuth() {
    return React.useContext(AuthContextImpl);
}