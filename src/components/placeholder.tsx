import styles from "./placeholder.module.css"

export default function Placeholder({ message }: { message: string }) {
  return <div className={`${styles.center} ${styles.full}`}>{message}</div>
}
