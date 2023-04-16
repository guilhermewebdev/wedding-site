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
    phone: yup.string().when('email', {
        is: (val: any) => !val,
        then: (schema) => schema.required('Informe o telefone ou o email.'),
    }),
    email: yup.string().email().when('phone', {
        is: (val: any) => !val,
        then: (schema) => schema.required('Informe o telefone ou o email.'),
    }),
})