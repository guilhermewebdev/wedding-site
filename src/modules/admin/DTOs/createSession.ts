import { CreateSessionPayload } from "../service";
import * as yup from 'yup';

export interface CreateSessionDTO extends CreateSessionPayload {}

export const createSessionDTO = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    browser: yup.string(),
})