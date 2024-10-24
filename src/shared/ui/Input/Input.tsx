import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <label className={clsx(styles.input, className)}>
      {label && <span className={styles.label}>{label}</span>}
      <input className={styles.inputField} {...props} />
    </label>
  );
};

export { Input };
