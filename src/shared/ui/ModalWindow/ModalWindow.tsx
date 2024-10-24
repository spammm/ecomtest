import { HtmlHTMLAttributes } from 'react';
import clsx from 'clsx';
import { Button } from '..';
import styles from './ModalWindow.module.scss';

interface ModalWindowProps extends HtmlHTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
}

const ModalWindow: React.FC<ModalWindowProps> = ({
  isOpen,
  onClose,
  children,
  className,
  ...props
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={clsx(styles.modalContent, className)}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        <Button
          variant="close"
          className={styles.closeButton}
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export { ModalWindow };
