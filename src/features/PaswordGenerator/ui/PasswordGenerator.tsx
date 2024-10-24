'use client';
import { useEffect, useState } from 'react';
import { Button, Checkbox, Input } from '@/shared/ui';
import { PasswordList } from './PasswordList';
import {
  getAvailableChars,
  getNewPassword,
  PasswordOptions,
} from '../utils/getNewPassword';
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
  //Максимально возможное количество символов для опции NoRepeat
  const [maxCount, setMaxCount] = useState<number>(
    getAvailableChars(options).length
  );
  const [passwords, setPasswords] = useState<string[]>([]);

  const isHasOptions =
    options.upper || options.lower || options.numbers || options.symbols;

  const isNoRepeatMustBeActive = maxCount >= length;

  const handleGenerate = () => {
    const newPassword = getNewPassword(length, options);
    setPasswords([...passwords, newPassword]);
  };

  useEffect(() => {
    setMaxCount(getAvailableChars(options).length);
  }, [options]);

  useEffect(() => {
    if (!isNoRepeatMustBeActive && options.noRepeat) {
      setOptions({ ...options, noRepeat: false });
    }
  }, [isNoRepeatMustBeActive, options]);

  const handlerChangeOptions = (option: keyof PasswordOptions) => {
    setOptions({ ...options, [option]: !options[option] });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.dashboard}>
        <Input
          className={styles.countInput}
          label={`Длина пароля:`}
          type="number"
          value={length}
          onChange={(e) => {
            const newLength = Number(e.target.value);
            setLength(newLength);
          }}
          placeholder="Введите длину пароля"
          min="1"
        />
        <div className={styles.checkboxes}>
          <Checkbox
            label="Использовать прописные буквы"
            checked={options.upper}
            onChange={() => handlerChangeOptions('upper')}
          />
          <Checkbox
            label="Использовать строчные буквы"
            checked={options.lower}
            onChange={() => handlerChangeOptions('lower')}
          />
          <Checkbox
            label="Использовать цифры"
            checked={options.numbers}
            onChange={() => handlerChangeOptions('numbers')}
          />
          <Checkbox
            label="Использовать символы: %, *, ), ?, @, #, $, ~"
            checked={options.symbols}
            onChange={() => handlerChangeOptions('symbols')}
          />
          <Checkbox
            label={`Избегать повторения символов(макс.симв. ${maxCount})`}
            checked={options.noRepeat}
            onChange={() => handlerChangeOptions('noRepeat')}
            disabled={!isNoRepeatMustBeActive}
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
