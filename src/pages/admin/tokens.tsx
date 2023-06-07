import React from "react";
import AdminBar from "../../components/AdminBar";
import { Auth, Private } from "../../hooks/useAuth";
import { buildUseForm } from "../../hooks/useForm";
import { apiClient } from "../../lib/apiClient";
import { GenerateCodesDTO, generateCodesDTO } from "../../modules/attendance/DTOs/generateCodes";
import { Code } from "../../modules/attendance/entities";
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const {
    NEXT_PUBLIC_BASE_RSVP_URL = '',
} = publicRuntimeConfig;

const useForm = buildUseForm<GenerateCodesDTO>(generateCodesDTO);


export default function Tokens() {
    const { register, onSubmit } = useForm();
    const [codes, setCodes] = React.useState<Code[]>([])
    const fetchCodes = React.useCallback(async () => {
        const { data } = await apiClient.get('/admin/codes')
        setCodes(data);
    }, [])
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
                    {codes.map(({ code }) => {
                        const link = `${NEXT_PUBLIC_BASE_RSVP_URL}/${code}`
                        return (
                            <li key={code}>
                                <p>{code}</p>
                                <p>{link}</p>
                            </li>
                        )
                    })}
                </ul>
            </main>
        </Private>
    )
}