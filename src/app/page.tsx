import { Scene } from '@/components/Scene'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.hero}>
      <section className={styles.intro}>
        <span className={styles.badge}>Neo Tokyo District</span>
        <h1 className={styles.headline}>Um bairro kawaii com alma neon, direto no seu navegador.</h1>
        <p className={styles.copy}>
          Explore uma esquina estilizada inspirada em arcades japoneses, com painéis fofos, néon e um
          bondinho retrô. Tudo criado proceduralmente com React Three Fiber para servir de vitrine ou
          cápsula visual do seu próximo projeto.
        </p>
        <div className={styles.ctaRow}>
          <button className={styles.primaryButton} type="button">
            Explorar cena
          </button>
          <button className={styles.secondaryButton} type="button">
            Baixar assets · soon
          </button>
        </div>
      </section>

      <section className={styles.sceneWrapper}>
        <Scene />
      </section>
    </main>
  )
}
