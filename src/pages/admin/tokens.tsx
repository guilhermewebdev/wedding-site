import React from "react";
import AdminBar from "../../components/AdminBar";
import { Auth, IsAuthenticated } from "../../hooks/useAuth";
import { buildUseForm } from "../../hooks/useForm";
import { apiClient } from "../../lib/apiClient";
import { GenerateCodesDTO, generateCodesDTO } from "../../modules/attendance/DTOs/generateCodes";
import { Code } from "../../modules/attendance/entities";

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
    }, [fetchCodes])
    return (
        <IsAuthenticated>
            <AdminBar />
            <main>
                <h1>Tokens</h1>
                <p>
                    <form onSubmit={onSubmit(submit)}>
                        <input {...register('amount')} type="number" />
                        <button>Gerar Tokens</button>
                    </form>
                </p>
                <ul>
                    {codes.map(code => (
                        <li key={code.code}>{code.code}</li>
                    ))}
                </ul>
            </main>
        </IsAuthenticated>
    )
}