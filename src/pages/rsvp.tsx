import Head from "next/head";
import Link from "next/link";
import styles from '../../styles/Styles.module.css'

export default function Home() {
    return (
        <>
            <Head>
                <title>Confirme Sua Presença</title>
            </Head>
            <main className={`${styles.main} ${styles.centralize}`}>
                <div>
                    <Link href="/">
                        Início
                    </Link>
                </div>
                <div className={styles.centralize}>
                    <h1 className={styles.title}>Confirme Sua Presença</h1>
                </div>

                <form className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="name">Nome</label>
                        <input id="name" />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="email">E-mail</label>
                        <input id="email" />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="phone">Telefone</label>
                        <input id="phone" />
                    </div>
                    <div className={styles.confirmationArea}>
                        <button>Confirmar</button>
                    </div>
                </form>
            </main>

        </>
    )
}