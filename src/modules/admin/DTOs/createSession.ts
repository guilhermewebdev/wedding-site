import { CreateSessionPayload } from "../service";
import * as yup from 'yup';

export interface CreateSessionDTO extends CreateSessionPayload {}

export const createSessionDTO = yup.object().shape({
    email: yup.string().email().required('O email é obrigatório'),
    password: yup.string().required('A senha é obrigatória'),
    browser: yup.string(),
})