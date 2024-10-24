import { MainMenu } from './MainMenu';
import { ProfileButton } from './ProfileButton';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <MainMenu />
      <ProfileButton />
    </header>
  );
};

export { Header };
