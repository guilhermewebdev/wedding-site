import Head from "next/head";
import styles from '../../styles/Styles.module.css'
import React from "react";
import { ConfirmAttendanceDTO, confirmAttendanceDTOimpl } from "../modules/attendance/DTOs/createGuest";
import { buildUseForm } from "../hooks/useForm";
import { apiClient } from "../lib/apiClient";
import { Field } from "./Field";
import Spinner from "./Spinner";

interface RSVPProps {
    code?: string;
}

const useForm = buildUseForm<ConfirmAttendanceDTO>(confirmAttendanceDTOimpl);

export function RSVP(props: RSVPProps) {
    const { code } = props;
    const { errors, register, onSubmit, loading, setValue } = useForm({ code });
    const submit = React.useCallback(async (form: ConfirmAttendanceDTO) => {
        await apiClient.post('/attendance', form);
    }, []);
    React.useEffect(() => {
        if(code) setValue('code', code);
    }, [code, setValue])
    return (
        <>
            <Head>
                <title>Confirme Sua Presença</title>
            </Head>
            <main className={`${styles.main} ${styles.centralize}`}>
                <div className={styles.confirmationNavigation}>
                    <a href="/">Início</a>
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
                        {loading 
                            ? <p><Spinner style={{ fontSize: 20 }} /></p>
                            : <button disabled={loading} type="submit">Confirmar</button>
                        }
                    </div>
                </form>
            </main>
        </>
    )
}