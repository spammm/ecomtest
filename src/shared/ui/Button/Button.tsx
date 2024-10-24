import { clsx } from 'clsx';
import styles from './Button.module.scss';
import CloseIcon from './icons/close.svg';
import CopyIcon from './icons/copy.svg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'close' | 'copy';
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(styles[variant], styles.button, className)}
      {...props}
    >
      {variant === 'close' && <CloseIcon className={styles.icon} />}
      {variant === 'copy' && <CopyIcon className={styles.icon} />}
      {variant !== 'close' && variant !== 'copy' && children}
    </button>
  );
};

export { Button };
