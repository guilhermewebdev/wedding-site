import * as yup from 'yup';

export interface GenerateCodesDTO {
    amount: number;
}

export const generateCodesDTO = yup.object().shape({
    amount: yup.number().max(200).min(1).required(),
});