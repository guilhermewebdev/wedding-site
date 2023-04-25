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
    };
    isValidated: boolean;
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
            return {
                form: validated,
                errors: {},
                isValidated: true,
            }
        } catch (error: any) {
            if (error instanceof yup.ValidationError) {
                return {
                    form,
                    errors: error.inner.reduce((previous, current) => ({
                        ...previous,
                        [current.path || '__other']: current.message,
                    }), {}),
                    isValidated: true,
                }
            }
            return {
                form,
                errors: {
                    __other: 'Erro ao validar formulário'
                },
                isValidated: true,
            }
        }
    }
    const useForm = () => {
        const [{ form, errors, isValidated: validated }, reduceForm] = React.useReducer(formReducer, {
            form: {},
            errors: {},
            isValidated: false,
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
        const onSubmit = (submit: (form: T) => any) => {
            return (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault()
                event.stopPropagation()
                if (Object.entries(errors).length == 0 && validated) {
                    return submit(form as T)
                }
            }
        }
        return {
            form,
            errors,
            register,
            setValue,
            onSubmit,
        }
    }
    return useForm;
}

