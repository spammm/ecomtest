'use client';
import { useState } from 'react';
import { Button, Checkbox, Input } from '@/shared/ui';
import { PasswordList } from './PasswordList';
import { getNewPassword, PasswordOptions } from '../utils/getNewPassword';
import styles from './PasswordGenerator.module.scss';

export const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState<number>(8);
  const [options, setOptions] = useState<PasswordOptions>({
    upper: false,
    lower: true,
    numbers: true,
    symbols: false,
    noRepeat: false,
  });
  const [passwords, setPasswords] = useState<string[]>([]);

  const isHasOptions =
    options.upper || options.lower || options.numbers || options.symbols;

  const handleGenerate = () => {
    const newPassword = getNewPassword(length, options);
    setPasswords([...passwords, newPassword]);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.dashboard}>
        <Input
          className={styles.countInput}
          label="Длина пароля(макс. 30):"
          type="number"
          value={length}
          onChange={(e) => {
            const newLength = Number(e.target.value);
            if (newLength <= 30) {
              setLength(newLength);
            }
          }}
          placeholder="Введите длину пароля, максимум 30 символов"
          min="1"
          max="30"
        />
        <div className={styles.checkboxes}>
          <Checkbox
            label="Использовать прописные буквы"
            checked={options.upper}
            onChange={() => setOptions({ ...options, upper: !options.upper })}
          />
          <Checkbox
            label="Использовать строчные буквы"
            checked={options.lower}
            onChange={() => setOptions({ ...options, lower: !options.lower })}
          />
          <Checkbox
            label="Использовать цифры"
            checked={options.numbers}
            onChange={() =>
              setOptions({ ...options, numbers: !options.numbers })
            }
          />
          <Checkbox
            label="Использовать символы: %, *, ), ?, @, #, $, ~"
            checked={options.symbols}
            onChange={() =>
              setOptions({ ...options, symbols: !options.symbols })
            }
          />
          <Checkbox
            label="Избегать повторения символов"
            checked={options.noRepeat}
            onChange={() =>
              setOptions({ ...options, noRepeat: !options.noRepeat })
            }
          />
        </div>

        <Button onClick={handleGenerate} disabled={!isHasOptions}>
          Сгенерировать пароль
        </Button>
      </div>

      <PasswordList list={passwords} />
    </div>
  );
};
