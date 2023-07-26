import styles from '../styles/components/layout.module.scss'
import { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
    children: ReactNode
    title: string
    logo_src?: string
}

export default function Layout({ children, title, logo_src }: Props) {
    if (!logo_src) logo_src = '/images/logos/bemol.png'

    return (
        <div className={styles.container}>
            <Head>
                <title>{`Conferência Farma Bol - ${title}`}</title>
            </Head>
            <img className={styles.img_logo} src={logo_src} alt="" />
            <h3>Check de Conferência</h3>
            <main>{children}</main>
        </div>
    )
}
