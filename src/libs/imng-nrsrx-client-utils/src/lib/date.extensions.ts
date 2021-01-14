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
export const MILLI_SECS_PER_DAY = 86400000;
export const DAYS_PER_WEEK = 7;
if (!Date.prototype.toShortDateString) { //NOSONAR
  Date.prototype.toShortDateString = function (this: Date): string {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const dt: Date = this;

    const locale = navigator.language ||
      (navigator.languages && navigator.languages.length > 0) ? navigator.languages[0] : 'en-US';

    return dt.toLocaleDateString(locale, shortDateOptions);
  };
}

if (!Date.prototype.weekOfYear) { //NOSONAR
  // tslint:disable-next-line: space-before-function-paren
  Date.prototype.weekOfYear = function (this: Date): number {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const dt: Date = this;
    const onejan = new Date(dt.getFullYear(), 0, 1);
    return Math.ceil(((dt.getTime() - onejan.getTime()) / MILLI_SECS_PER_DAY + onejan.getDay() + 1) / DAYS_PER_WEEK);
  };
}
export { };
