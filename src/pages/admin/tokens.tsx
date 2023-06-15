import React from "react";
import AdminBar from "../../components/AdminBar";
import { Auth, Private } from "../../hooks/useAuth";
import { buildUseForm } from "../../hooks/useForm";
import { apiClient } from "../../lib/apiClient";
import { GenerateCodesDTO, generateCodesDTO } from "../../modules/attendance/DTOs/generateCodes";
import { Code } from "../../modules/attendance/entities";
import getConfig from 'next/config';
import Spinner from "components/Spinner";

interface TokensState {
    codes: Code[];
    isLoading: boolean;
}

const { publicRuntimeConfig } = getConfig();
const {
    NEXT_PUBLIC_BASE_RSVP_URL = '',
} = publicRuntimeConfig;

const useForm = buildUseForm<GenerateCodesDTO>(generateCodesDTO);

export default function Tokens() {
    const { register, onSubmit } = useForm();
    const [state, setCodes] = React.useState<TokensState>({
        codes: [],
        isLoading: false,
    });
    const { codes, isLoading } = state;
    const fetchCodes = React.useCallback(async () => {
        try {
            setCodes({ ...state, isLoading: true })
            const { data } = await apiClient.get('/admin/codes')
            setCodes({ codes: data, isLoading: false });            
        } catch (error) {
            setCodes({ ...state, isLoading: false });
            throw error;
        }
    }, [state])
    const submit = React.useCallback(async (form: GenerateCodesDTO) => {
        await apiClient.post('/admin/codes', form);
        await fetchCodes();
    }, [fetchCodes])
    React.useEffect(() => {
        fetchCodes();
    }, [])
    return (
        <Private>
            <AdminBar />
            <main>
                <h1>Tokens</h1>
                <form onSubmit={onSubmit(submit)}>
                    <p>
                        <input {...register('amount')} type="number" />
                        <button>Gerar Tokens</button>
                    </p>
                </form>
                <ul>
                {isLoading 
                    ? <Spinner /> 
                    : codes.map(({ code }) => {
                        const link = `${NEXT_PUBLIC_BASE_RSVP_URL}/${code}`;
                        const qrCode = `/api/admin/qr/${code}`;
                        return (
                            <li key={code}>
                                <p>Código: {code}</p>
                                <p>Link: {link}</p>
                                <p>
                                    <img src={qrCode} alt={link} />
                                </p>
                            </li>
                        )
                    })}
                </ul>
            </main>
        </Private>
    )
}