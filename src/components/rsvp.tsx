import Head from "next/head";
import Link from "next/link";
import styles from '../../styles/Styles.module.css'
import React from "react";
import { ConfirmAttendanceDTO, confirmAttendanceDTOimpl } from "../modules/attendance/DTOs/createGuest";
import { buildUseForm } from "../hooks/useForm";

interface RSVPProps {
    code?: string;
}

const useForm = buildUseForm<ConfirmAttendanceDTO>(confirmAttendanceDTOimpl);

export default function RSVP(props: RSVPProps) {
    const { code } = props;
    const { errors, register, onSubmit } = useForm()
    const submit = (form: ConfirmAttendanceDTO) => {

    }
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
                    <div className={styles.field}>
                        <label htmlFor="name">Nome</label>
                        <input {...register('name')} />
                        <small>{errors['name']}</small>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="email">E-mail</label>
                        <input {...register('email')} />
                        <small>{errors['email']}</small>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="phone">Telefone</label>
                        <input maxLength={11} {...register('phone')} />
                        <small>{errors['phone']}</small>
                    </div>
                    {!code && (
                        <div className={styles.field}>
                            <label htmlFor="Código">Código</label>
                            <input {...register('code')} />
                            <small>{errors['code']}</small>
                        </div>
                    )}
                    <div className={styles.confirmationArea}>
                        <p>{errors['__other']}</p>
                        <button type="submit">Confirmar</button>
                    </div>
                </form>
            </main>

        </>
    )
}