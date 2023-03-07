export function isBinary(text: string): boolean {
  return /^[01]+$/.test(text);
}

export function binaryToDecimal(binaryNumber: string): number {
  return parseInt(binaryNumber, 2);
  // OR
  // const binaryLength = binaryNumber.length;
  // let decimal = 0;
  // for (let i = binaryLength; i >= 0; i--) {
  //   if (binaryNumber[i] == "1") {
  //     decimal += Math.pow(2, binaryLength - i - 1);
  //   }
  // }
  //return decimal;
}
