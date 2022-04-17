export function numPad(x: number, maxLength: number = 2) {
  return x.toString().padStart(maxLength, "0");
}
