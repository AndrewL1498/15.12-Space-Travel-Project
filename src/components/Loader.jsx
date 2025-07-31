import styles from './Loader.module.css';

function Loader() {
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.loaderBox}>
        <div className={styles.spinner} data-testid="loader"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
}

export default Loader;
