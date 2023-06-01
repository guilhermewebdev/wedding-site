import AdminBar from "../../components/AdminBar";
import { Auth } from "../../hooks/useAuth";
import { buildUseForm } from "../../hooks/useForm";
import { apiClient } from "../../lib/apiClient";
import { GenerateCodesDTO, generateCodesDTO } from "../../modules/attendance/DTOs/generateCodes";

const useForm = buildUseForm<GenerateCodesDTO>(generateCodesDTO);

const submit = async (form: GenerateCodesDTO) => {
    await apiClient.post('/admin/codes', form);
}

export default function Tokens() {
    const { register, onSubmit } = useForm();
    return (
        <Auth>
            <AdminBar />
            <main>
                <h1>Tokens</h1>
                <p>
                    <form onSubmit={onSubmit(submit)}>
                        <input {...register('amount')} type="number" />
                        <button>Gerar Tokens</button>
                    </form>
                </p>
            </main>
        </Auth>
    )
}