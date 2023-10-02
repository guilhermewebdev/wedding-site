import * as yup from 'yup'

export interface ConfirmAttendanceDTO {
    name: string;
}

export const confirmAttendanceDTOimpl = yup.object<ConfirmAttendanceDTO>().shape({
    name: yup.string().required('O nome é obrigatório'),
});