// Форматирование числа с запятыми
export const formatNumber = (num: string): string => {
  const [integer, decimal] = num.split('.');
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
};

// Обработка вычислений
export const calculateResult = (
  previousInput: string,
  operator: string,
  input: string
): string => {
  const result = eval(`${previousInput}${operator}${input}`);
  return result.toString();
};

// Клавиши калькулятора
export const calcKeys: Array<string> = [
  'C',
  '+/-',
  '%',
  '/',
  '7',
  '8',
  '9',
  '*',
  '4',
  '5',
  '6',
  '-',
  '1',
  '2',
  '3',
  '+',
  '0',
  '.',
  '←',
  '=',
];

// Маппинг клавиш клавиатуры
export const keyMap: { [key: string]: string } = {
  '+': '+',
  '-': '-',
  '*': '*',
  '/': '/',
  '=': '=',
  Enter: '=',
  Backspace: '←',
  Escape: 'C',
};
