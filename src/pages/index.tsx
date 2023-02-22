import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Styles.module.css'

const scaleDownBackground = 5

export default function Home() {
  return (
    <>
      <Head>
        <title>Thayná & Guilherme</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.home}>
          <Image
            className={styles.backgroundImage}
            alt=''
            src={require('../../statics/we.jpg')}
            height={3750 / scaleDownBackground}
            width={3000 / scaleDownBackground}
          />
          <div className={styles.homeText}>
            <h1 className={styles.title}>Guilherme & Thayná</h1>
            <nav className={styles.navigation}>
              <ul>
                <li>
                  <a href="">Confirmar presença</a>
                </li>
                <li>
                  <a href="#information">Informações</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className={styles.centralize}>
          <h2 className={styles.title} id="information">Informações</h2>
          <div className={styles.textInformation}>
            <div>
              <h3 className={styles.subtitle}>Cerimônia</h3>
              <p>Será realizada às 17h do dia 14 de Outubro de 2023 na Igreja da Matriz</p>
            </div>
            <div>
              <h3 className={styles.subtitle}>Recepção</h3>
              <p>A festa será realizada logo após a cerimônia, a partir de 19h no Mirante Clube</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
