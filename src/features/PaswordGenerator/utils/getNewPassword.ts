export interface PasswordOptions {
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  symbols: boolean;
  noRepeat: boolean;
}

const getRandomChar = (availableChars: string): string => {
  return availableChars[Math.floor(Math.random() * availableChars.length)];
};

export const getNewPassword = (
  length: number,
  options: PasswordOptions
): string => {
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '%*)?@#$~';

  let availableChars = '';
  if (options.upper) availableChars += upperCase;
  if (options.lower) availableChars += lowerCase;
  if (options.numbers) availableChars += numbers;
  if (options.symbols) availableChars += symbols;

  let password = '';
  const usedChars = new Set();

  for (let i = 0; i < length; i++) {
    let randomChar = getRandomChar(availableChars);

    if (options.noRepeat) {
      while (usedChars.has(randomChar)) {
        randomChar = getRandomChar(availableChars);
      }
      usedChars.add(randomChar);
    }

    password += randomChar;
  }

  return password;
};
