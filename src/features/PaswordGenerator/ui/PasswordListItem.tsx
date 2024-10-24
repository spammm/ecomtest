'use client';
import { useRef, useState, memo } from 'react';
import { Button } from '@/shared/ui';
import styles from './PasswordList.module.scss';

interface PasswordListItemProps {
  value: string;
}

const PasswordListItem: React.FC<PasswordListItemProps> = memo(({ value }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (inputRef.current) {
      try {
        await navigator.clipboard.writeText(inputRef.current.value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Ошибка копирования текста: ', err);
      }
    }
  };

  const handleSelectText = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  return (
    <div className={styles.item}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        readOnly
        onClick={handleSelectText}
        className={styles.itemInput}
      />
      <Button
        variant="copy"
        onClick={handleCopy}
        className={styles.itemButton}
      />
      {copied && (
        <div className={styles.notification}>Скопировано в буфер обмена</div>
      )}
    </div>
  );
});

PasswordListItem.displayName = 'PasswordListItem';

export { PasswordListItem };
