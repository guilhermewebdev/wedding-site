import Head from "next/head";
import styles from '../../styles/Styles.module.css'
import React, { useState } from "react";
import { ConfirmAttendanceDTO, confirmAttendanceDTOimpl } from "../modules/attendance/DTOs/createGuest";
import { buildUseForm } from "../hooks/useForm";
import { apiClient } from "../lib/apiClient";
import { Field } from "./Field";
import Spinner from "./Spinner";
import Modal from "./Modal";
import Image from "next/image";

interface State {
    isSuccess: boolean;
}

const defaultState: State = {
    isSuccess: false,
}

const useForm = buildUseForm<ConfirmAttendanceDTO>(confirmAttendanceDTOimpl);

export function RSVP() {
    const { errors, register, onSubmit, loading } = useForm({});
    const [state, setState] = useState<State>(defaultState)
    const { isSuccess } = state;
    const submit = React.useCallback(async (form: ConfirmAttendanceDTO) => {
        await apiClient.post('/attendance', form);
        setState({ ...state, isSuccess: true })
    }, []);
    return (
        <>
            <Head>
                <title>Confirme Sua Presença</title>
            </Head>
            <main className={`${styles.main} ${styles.centralize}`}>
                <div className={styles.confirmationNavigation}>
                    <a href="/">
                        <Image src={require("../../public/img/logo.png")} alt="Logo" className={styles.logo} />
                    </a>
                    <a href="/">Início</a>
                </div>
                <div className={`${styles.centralize} ${styles.padding4}`}>
                    <h1 className={styles.title}>Confirme Sua Presença</h1>
                </div>
                <form onSubmit={onSubmit(submit)} className={styles.form}>
                    <Field label="Nome Completo" {...register("name")} error={errors['name']} />
                    <div className={styles.confirmationArea}>
                        <p>{errors['__other']}</p>
                        {loading 
                            ? <p><Spinner style={{ fontSize: 20 }} /></p>
                            : <button disabled={loading} type="submit">Confirmar</button>
                        }
                    </div>
                </form>
                <Modal show={isSuccess} onClose={() => setState({ ...state, isSuccess: false })}>
                    <h3>Agradecemos a sua confirmação!</h3>
                    <p>Será um prazer termos sua presença.</p>
                    <p>Nos vemos na cerimônia</p>
                    <p>
                        <a className={styles.button} href="/">Ir para o início</a>
                    </p>
                </Modal>
            </main>
        </>
    )
}