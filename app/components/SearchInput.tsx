import styles from './SearchInput.module.css';

export function SearchInput() {
  return <input aria-label="Quick Search" placeholder="Quick Search" className={styles.input} />;
}
