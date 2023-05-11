import { buildUseForm } from "../../hooks/useForm"
import { CreateAdminDTO, createAdminDTO } from "../../modules/admin/DTOs/createAdmin"
import * as yup from 'yup';

const useForm = buildUseForm<CreateAdminDTO & { token: string }>(createAdminDTO.shape({
    token: yup.string().required(),
}));

export default function AddAdmin() {
    const { register } = useForm();
    return (
        <main>
            <form>

            </form>
        </main>
    )
}