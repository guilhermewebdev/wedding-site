import * as yup from 'yup'

export interface ConfirmAttendanceDTO {
    name: string;
    codeId: string;
    phone?: string;
    email?: string;
}

export const confirmAttendanceDTOimpl = yup.object<ConfirmAttendanceDTO>().shape({
    name: yup.string().required('O nome é obrigatório'),
    codeId: yup.string().required('O nome é obrigatório'),
    phone: yup.string(),
    email: yup.string().email(),
});