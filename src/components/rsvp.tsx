import Head from "next/head";
import Link from "next/link";
import styles from '../../styles/Styles.module.css'

interface RSVPProps {
    code?: string;
}

export default function RSVP(props: RSVPProps) {
    const { code } = props;
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
                    <h3 className={styles.fillData}>Preencha os dados e coloque o código em seu voucher. Código único por pessoa!</h3>
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
                    {!code && (
                        <div className={styles.field}>
                            <label htmlFor="Código">Código</label>
                            <input id="código" />
                        </div>
                    )}
                    <div className={styles.confirmationArea}>
                        <button>Confirmar</button>
                    </div>
                </form>
            </main>

        </>
    )
}