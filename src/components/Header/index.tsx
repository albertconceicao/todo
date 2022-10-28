import styles from './styles.module.css';

export const Header = () => {
    return (
        <div className={styles.main}>
            <img className={styles.image} src="./Logo.svg" alt="Logo image"/>
        </div>
    );
}