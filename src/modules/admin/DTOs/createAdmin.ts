import { CreateAdminPayload } from "../service";
import * as yup from 'yup';

export interface CreateAdminDTO extends CreateAdminPayload {}

export const createAdminDTO = yup.object().shape({
    name: yup.string().required('O campo "nome" é obrigatório'),
    email: yup.string().email('Email inválido').required('O campo "email" é obrigatório'),
    password: yup.string().required('O campo "senha" é obrigatório').min(8),
})