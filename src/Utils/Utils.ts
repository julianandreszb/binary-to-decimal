export function isBinary(str: string): boolean {
  // Regular expression that matches a binary number
  const binaryRegex = /^[01]+$/;

  // Check if the string matches the regular expression
  return binaryRegex.test(str);
}

export function binaryToDecimal(binaryNumber: string): number {
  return parseInt(binaryNumber, 2);
}

export function decimalToBinary(decimalNumber: number): string {
  return decimalNumber.toString(2);
}

export function generateRandomDecimal(max: number = 100000000): number {
  return Math.floor(Math.random() * max) + 1;
}
