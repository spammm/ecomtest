import { PasswordGenerator } from '@/features/PaswordGenerator';
import styles from './GeneratorPage.module.scss';

const GeneratorPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Генератор паролей</h1>
      <PasswordGenerator />
    </div>
  );
};

export default GeneratorPage;
