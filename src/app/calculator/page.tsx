import { Calculator } from '@/features/Calculator';
import styles from './CalculatorPage.module.scss';

const CalculatorPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Calculator />
    </div>
  );
};

export default CalculatorPage;
