import React from 'react';
import * as yup from 'yup';


interface FormReducerChange<T> {
    key: keyof T;
    value: string;
}

enum Commands {
    VALIDATE,
    SET_ERROR,
}

interface FormReducerCommand {
    command: Commands;
    data?: any;
}

type FormReducerActions<T> = FormReducerChange<T> | FormReducerCommand;

type FormErrors<T extends {}> = {
    [P in keyof T]?: string;
}

type CommandMap<T extends {}> = {
    [s in FormReducerCommand['command']]: (context: ValidationContext<T>) => FormState<T>;
}

interface ValidationContext<T extends {}> {
    validator: yup.ObjectSchema<T>;
    state: FormState<T>;
    action: FormReducerActions<T>;
}

interface FormState<T extends {}> {
    form: Partial<T>;
    errors: FormErrors<T> & {
        __other?: string;
    };
    isValidated: boolean;
}

function validateForm<T extends {}>(context: ValidationContext<T>): FormState<T> {
    const { validator, state } = context;
    const { form } = state;
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

function mutateError<T extends {}>(context: ValidationContext<T>): FormState<T> {
    const { state } = context;
    const { data } = context.action as FormReducerCommand;
    return {
        ...state,
        errors: {
            ...state.errors,
            ...data,
        },
    }
}


export function buildUseForm<T extends {}>(validator: yup.ObjectSchema<T>) {
    const commandMap: CommandMap<T> = {
        [Commands.VALIDATE]: validateForm<T>,
        [Commands.SET_ERROR]: mutateError<T>,
    }
    const formReducer: React.Reducer<FormState<T>, FormReducerActions<T>> = (state: FormState<T>, action: FormReducerActions<T>) => {
        const context: ValidationContext<T> = {
            validator,
            state,
            action,
        }
        if ('command' in action) {
            return commandMap[action.command](context)
        }
        const { form: oldForm } = state;
        const { key, value } = action;
        const form = {
            ...oldForm,
            [key]: value,
        }
        return validateForm({ ...context, state: { ...state, form } })
    }
    const useForm = () => {
        const [loading, setLoading] = React.useState(false);
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
            return async (event: React.FormEvent<HTMLFormElement>) => {
                try {
                    setLoading(true)
                    reduceForm({ command: Commands.VALIDATE })
                    event.preventDefault()
                    event.stopPropagation()
                    if (Object.entries(errors).length == 0 && validated) {
                        await submit(form as T)
                    }
                } catch (e) {
                    throw e
                } finally {
                    setLoading(false)
                }
            }
        }
        const setError = (key: keyof T | '__other', message: string) => {
            reduceForm({ command: Commands.SET_ERROR, data: { [key]: message } })
        }
        return {
            form,
            errors,
            register,
            setValue,
            onSubmit,
            loading,
            setError,
        }
    }
    return useForm;
}

