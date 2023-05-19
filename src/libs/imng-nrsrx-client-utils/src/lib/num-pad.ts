export function numPad(x: number, maxLength = 2) {
  return x.toString().padStart(maxLength, '0');
}
