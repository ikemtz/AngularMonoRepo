declare global {
  interface Date {
    toShortDateString(): string;
  }
}

export const shortDateOptions: Intl.DateTimeFormatOptions = {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric'
};
Date.prototype.toShortDateString = function (): string {
  return this.toLocalDateString('en-US', shortDateOptions);
};

export { };
