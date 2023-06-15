import { Field } from "../../components/Field";
import { buildUseForm } from "../../hooks/useForm"
import { CreateSessionDTO, createSessionDTO } from "../../modules/admin/DTOs/createSession";
import styles from '../../../styles/Styles.module.css'
import { apiClient } from "../../lib/apiClient";
import { useRouter } from "next/router";
import useAuth from "../../hooks/useAuth";
import Spinner from "components/Spinner";

const useForm = buildUseForm<CreateSessionDTO>(createSessionDTO);

export default function AddAdmin() {
    const { register, errors, loading, onSubmit } = useForm();
    const { checkAuth } = useAuth();
    const router = useRouter();
    const submit = async (form: CreateSessionDTO) => {
        await apiClient.post('/session', form);
        checkAuth()
        await router.push('/admin/')
    }
    return (
        <main className={`${styles.main} ${styles.centralize}`}>
            <div className={`${styles.centralize} ${styles.padding4}`}>
                <h1 className={styles.title}>Entrar no painel do admin</h1>
            </div>
            <form onSubmit={onSubmit(submit)} className={styles.form}>
                <Field {...register('email')} label="Email" error={errors['email']} />
                <Field type="password" {...register('password')} label="Senha" error={errors['password']} />
                <div className={styles.confirmationArea}>
                    <p>{errors['__other']}</p>
                    <p>{loading && <Spinner />}</p>
                    <button disabled={loading} type="submit">Entrar</button>
                </div>
            </form>
        </main>
    )
}