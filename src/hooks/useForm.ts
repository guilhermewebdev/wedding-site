import React from 'react';
import * as yup from 'yup';


interface FormReducerAction<T> {
    key: keyof T;
    value: string;
}

type FormErrors<T extends {}> = {
    [P in keyof T]?: string;
}

interface FormState<T extends {}> {
    form: Partial<T>;
    errors: FormErrors<T> & {
        __other?: string;
    }
}


export function buildUseForm<T extends {}>(validator: yup.ObjectSchema<T>) {
    const formReducer: React.Reducer<FormState<T>, FormReducerAction<T>> = (state: FormState<T>, action: FormReducerAction<T>) => {
        const { form: oldForm } = state;
        const { key, value } = action;
        const form = {
            ...oldForm,
            [key]: value,
        }
        try {
            const validated = validator.validateSync(form, {
                abortEarly: false,
            });
            console.log(validated, form)
            return {
                form,
                errors: {},
            }
        } catch (error: any) {
            if (error instanceof yup.ValidationError) {
                console.log(form, error)
                return {
                    form,
                    errors: error.inner.reduce((previous, current) => ({
                        ...previous,
                        [current.path || '__other']: current.message,
                    }), {}),
                }
            }
            return {
                form,
                errors: {
                    __other: 'Erro ao validar formulário'
                }
            }
        }
    }
    const useForm = () => {
        const [{ form, errors}, reduceForm] = React.useReducer(formReducer, {
            form: {},
            errors: {},
        });
        const change = (key: keyof T): React.ChangeEventHandler<HTMLInputElement> => {
            return (event) => {
                reduceForm({ key, value: event.target.value })
            }
        }
        const register = (key: keyof T) => ({
            onChange: change(key),
            value: form[key],
            id: key,
        })
        const setValue = (key: keyof T, value: string) => {
            reduceForm({ key, value })
        }
        return {
            form,
            errors,
            register,
            setValue,
        }
    }
    return useForm;
}

