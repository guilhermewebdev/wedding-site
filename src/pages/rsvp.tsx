import Head from "next/head";
import styles from '../../styles/Styles.module.css'

export default function Home() {
    return (
        <>
            <Head>
                <title>Confirme Sua Presença</title>
            </Head>
            <main>
                <h1>Confirme Sua Presença</h1>
                <form>
                    <div>
                        <label htmlFor="name">Nome</label>
                        <input id="name" />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input id="email" />
                    </div>
                    <div>
                        <label htmlFor="phone">Telefone</label>
                        <input id="phone" />
                    </div>
                </form>
            </main>

        </>
    )
}