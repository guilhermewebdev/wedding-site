import Head from "next/head";
import Link from "next/link";
import styles from '../../styles/Styles.module.css'
import React from "react";
import { ConfirmAttendanceDTO, confirmAttendanceDTOimpl } from "../modules/attendance/DTOs/createGuest";
import { buildUseForm } from "../hooks/useForm";
import { apiClient } from "../lib/apiClient";
import { AxiosError } from "axios";

interface RSVPProps {
    code?: string;
}

interface FieldProps extends React.HTMLProps<HTMLInputElement> {
    id: string;
    error?: string;
    label: string;
}

const useForm = buildUseForm<ConfirmAttendanceDTO>(confirmAttendanceDTOimpl);

function Field(props: FieldProps) {
    const { id, label, error, ...inputProps } = props;
    return (
        <div className={styles.field}>
            <label htmlFor={id}>{label}</label>
            <input {...inputProps} id={id} />
            <small>{error}</small>
        </div>
    )
}

export default function RSVP(props: RSVPProps) {
    const { code } = props;
    const { errors, register, onSubmit, loading, setError, setValue } = useForm({ code })
    const submit = async (form: ConfirmAttendanceDTO) => {
        try {
            await apiClient.post('/attendance', form);
        } catch (error: any) {
            if (error instanceof AxiosError) {
                const message = error.response?.data?.message;
                return setError('__other', message);
            }
            return setError('__other', 'Erro desconhecido');
        }
    }
    React.useEffect(() => {
        if(code) setValue('code', code);
    }, [code])
    return (
        <>
            <Head>
                <title>Confirme Sua Presença</title>
            </Head>
            <main className={`${styles.main} ${styles.centralize}`}>
                <div className={styles.confirmationNavigation}>
                    <Link href="/">
                        Início
                    </Link>
                </div>
                <div className={`${styles.centralize} ${styles.padding4}`}>
                    <h1 className={styles.title}>Confirme Sua Presença</h1>
                    {!code && (
                        <h3 className={styles.fillData}>Preencha os dados e coloque o código em seu voucher. Código único por pessoa!</h3>
                    )}
                </div>
                <form onSubmit={onSubmit(submit)} className={styles.form}>
                    <Field label="Nome" {...register("name")} error={errors['name']} />
                    <Field label="Email" {...register("email")} error={errors['email']} />
                    <Field maxLength={11} label="Telefone / WhatsApp" {...register("phone")} error={errors['phone']} />
                    <Field label="Código" {...register("code")} disabled={!!code} error={errors['code']} />
                    <div className={styles.confirmationArea}>
                        <p>{errors['__other']}</p>
                        <p>{loading && "Carregando..."}</p>
                        <button disabled={loading} type="submit">Confirmar</button>
                    </div>
                </form>
            </main>
        </>
    )
}