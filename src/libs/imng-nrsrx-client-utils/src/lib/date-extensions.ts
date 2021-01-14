declare global {
  export interface Date {
    toShortDateString(): string;
    weekOfYear(): number;
  }
}

export const shortDateOptions: Intl.DateTimeFormatOptions = {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric'
};
export const millisecsInDay = 86400000;
if (!Date.prototype.toShortDateString) {
  Date.prototype.toShortDateString = function (): string {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const dt: Date = this;

    const locale = navigator.language ||
      (navigator.languages && navigator.languages.length > 0) ? navigator.languages[0] : 'en-US';

    return dt.toLocaleDateString(locale, shortDateOptions);
  };
}

if (!Date.prototype.weekOfYear) {
  // tslint:disable-next-line: space-before-function-paren
  Date.prototype.weekOfYear = function (): number {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const dt: Date = this;
    const onejan = new Date(dt.getFullYear(), 0, 1);
    return Math.ceil(((dt.getTime() - onejan.getTime()) / millisecsInDay + onejan.getDay() + 1) / 7);
  };
}
export { };
