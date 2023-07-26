import styles from '../styles/components/message.module.scss'
import { IMessage } from '../interfaces/Message'

export default function Message({ show, text, type }: IMessage) {
    return <span className={`${styles.resultSpan} ${styles[type]}`}>{show ? text : null}</span>
}
