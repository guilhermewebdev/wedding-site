import * as yup from 'yup'

export interface ConfirmAttendanceDTO {
    name: string;
    code: string;
    phone?: string;
    email?: string;
}

export const confirmAttendanceDTOimpl = yup.object<ConfirmAttendanceDTO>().shape({
    name: yup.string().required('O nome é obrigatório').trim(),
    code: yup.string().required('O código é obrigatório').trim(),
    phone: yup.string().matches(/^[0-9]{2}[9]?[0-9]{8}$/ig, 'Informe um telefone válido').trim(),
    email: yup.string().email('Informe um email válido').trim(),
});