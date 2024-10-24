import Link from 'next/link';
import styles from './MainMenu.module.scss';

const MainMenu: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">Главная</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/generator">Генератор</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/calculator">Калькулятор</Link>
        </li>
      </ul>
    </nav>
  );
};

export { MainMenu };
