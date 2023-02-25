export function isBinary(text: string): Boolean {
  return /^[01]+$/.test(text);
}
