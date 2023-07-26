import styles from '../styles/components/product.module.scss'
import { IProduct } from '../interfaces/Product'

export default function Product({
    id,
    image,
    name,
    description,
    ean,
    sku,
    qtd,
    qtd_checked,
    created_at,
    updated_at,
}: IProduct) {
    return (
        <div className={styles.product}>
            <div className={styles.image}>
                <img src={image} width={210} />
            </div>
            <div className={styles.name}>
                <span>{description}</span>
            </div>
            <div className={styles.data}>
                <div className={styles.info}>
                    <div className={styles.field}>
                        <span className={styles.title}>EAN: </span>
                        <span className={styles.description}>{ean}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.title}>SKU: </span>
                        <span className={styles.description}>{sku}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.title}>QTD: </span>
                        <span className={styles.description}>{qtd}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.title}>QTD Conferida: </span>
                        <span className={styles.description}>{qtd_checked}</span>
                    </div>
                </div>
                <div className={styles.check}>
                    <img
                        src={qtd === qtd_checked ? '/images/icons/check.png' : '/images/icons/block.png'}
                        width={24}
                        height={24}
                    />
                </div>
            </div>
        </div>
    )
}
