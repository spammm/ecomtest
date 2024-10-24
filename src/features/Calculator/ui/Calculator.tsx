'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import clsx from 'clsx';
import { Work_Sans } from 'next/font/google';
import styles from './Calculator.module.scss';

import {
  formatNumber,
  calculateResult,
  calcKeys,
  keyMap,
} from '../utils/calculatorUtils';

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
});

const Calculator: React.FC = () => {
  const [input, setInput] = useState('0');
  const [previousInput, setPreviousInput] = useState('');
  const [operator, setOperator] = useState('');
  const [lastOperator, setLastOperator] = useState('');
  const [actionDisplay, setActionDisplay] = useState('');
  const [lastInput, setLastInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Динамическое измеение размера шрифта
  const displayRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(96);
  useEffect(() => {
    const resizeText = () => {
      const container = displayRef.current;
      if (!container) return;

      const containerWidth = container.offsetWidth;
      const textLength = input.length;

      if (textLength > 6) {
        const newFontSize = Math.min((containerWidth / textLength) * 1.5, 96);
        setFontSize(newFontSize);
      } else {
        setFontSize(96);
      }
    };

    resizeText();
  }, [input]);

  const resetCalculator = useCallback(() => {
    setInput('0');
    setPreviousInput('');
    setOperator('');
    setLastOperator('');
    setLastInput('');
    setActionDisplay('');
  }, []);

  const handleBackspace = useCallback(() => {
    setInput(input.length > 1 ? input.slice(0, -1) : '0');
  }, [input]);

  const toggleSign = useCallback(() => {
    setInput((parseFloat(input) * -1).toString());
  }, [input]);

  const handlePercentage = useCallback(() => {
    setInput((parseFloat(input) / 100).toString());
  }, [input]);

  const handleButtonClick = useCallback(
    (value: string) => {
      setErrorMessage(null);
      if (['+', '-', '*', '/'].includes(value)) {
        setOperator(value);
        setPreviousInput(input);
        setLastInput('');
        setInput('');
        setActionDisplay(`${formatNumber(input)} ${value}`);
      } else if (value === '=') {
        const currentOperator = operator || lastOperator;
        const currentInput = input || lastInput;

        // Проверка на деление на ноль
        if (currentOperator === '/' && currentInput === '0') {
          setErrorMessage('Cannot be divided by zero');
          resetCalculator();
          return;
        }

        if (previousInput && currentOperator && currentInput) {
          const result = calculateResult(
            previousInput,
            currentOperator,
            currentInput
          );
          setInput(result);
          setLastOperator(currentOperator);
          setLastInput(currentInput);
          setPreviousInput('');
          setOperator('');
          setActionDisplay(
            `${formatNumber(previousInput)} ${currentOperator} ${formatNumber(
              currentInput
            )} =`
          );
        }
      } else if (value === 'C') {
        resetCalculator();
      } else if (value === '←') {
        handleBackspace();
      } else if (value === '+/-') {
        toggleSign();
      } else if (value === '%') {
        handlePercentage();
      } else {
        setInput(input === '0' ? value : input + value);
      }
    },
    [
      input,
      operator,
      previousInput,
      lastOperator,
      lastInput,
      resetCalculator,
      handleBackspace,
      toggleSign,
      handlePercentage,
    ]
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === ' ') {
        return;
      }
      if (!isNaN(Number(event.key))) {
        handleButtonClick(event.key);
      } else if (keyMap[event.key]) {
        handleButtonClick(keyMap[event.key]);
      } else if (event.key === '.') {
        handleButtonClick('.');
      }
    },
    [handleButtonClick]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className={clsx(workSans.className, styles.calculator)}>
      <div className={styles.actionDisplay}>{actionDisplay}</div>
      <div
        className={styles.display}
        ref={displayRef}
        style={{ fontSize: `${fontSize}px` }}
      >
        {errorMessage ? (
          <span className={styles.error}>{errorMessage}</span>
        ) : (
          formatNumber(input)
        )}
      </div>
      <div className={styles.buttonsGrid}>
        {calcKeys.map((symbol) => (
          <button
            key={symbol}
            onClick={() => handleButtonClick(symbol)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault();
            }}
          >
            {symbol}
          </button>
        ))}
      </div>
    </div>
  );
};

export { Calculator };
