export interface PasswordOptions {
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  symbols: boolean;
  noRepeat: boolean;
}

const charsCollection = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '%*)?@#$~',
};

const getRandomChar = (availableChars: string): string => {
  return availableChars[Math.floor(Math.random() * availableChars.length)];
};

export const getAvailableChars = (options: PasswordOptions): string => {
  let availableChars = '';
  Object.keys(charsCollection).forEach((key) => {
    if (options[key as keyof typeof charsCollection]) {
      availableChars += charsCollection[key as keyof typeof charsCollection];
    }
  });
  return availableChars;
};

export const getNewPassword = (
  length: number,
  options: PasswordOptions
): string => {
  const availableChars = getAvailableChars(options);
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
