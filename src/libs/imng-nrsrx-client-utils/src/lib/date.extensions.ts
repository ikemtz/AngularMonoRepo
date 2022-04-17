import { numPad } from './num-pad';

declare global {
  export interface Date {
    toShortDateString(): string;
    weekOfYear(): number;
    toLocalTimeStamp(): string;
  }
}

export const shortDateOptions: Intl.DateTimeFormatOptions = {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric',
};
export const MILLI_SECS_PER_DAY = 86400000;
export const MILLI_SECS_PER_SEC = 60000;
export const DAYS_PER_WEEK = 7;
if (!Date.prototype.toShortDateString) {
  //NOSONAR
  Date.prototype.toShortDateString = function (this: Date): string { //NOSONAR
    return toShortDateString(this);
  };
}

if (!Date.prototype.weekOfYear) {
  //NOSONAR
  // tslint:disable-next-line: space-before-function-paren
  Date.prototype.weekOfYear = function (this: Date): number { //NOSONAR
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    return weekOfYear(this);
  };
}
export { };

export function weekOfYear(dt: Date): number {
  const onejan = new Date(dt.getFullYear(), 0, 1);
  return Math.ceil(((dt.getTime() - onejan.getTime()) / MILLI_SECS_PER_DAY + onejan.getDay() + 1) / DAYS_PER_WEEK);
}

// tslint:disable-next-line: space-before-function-paren
export function toLocalTimeStamp(dt: Date = new Date()): string {
  return `${dt.getFullYear()}${numPad(dt.getMonth() + 1)}${numPad(dt.getDate())}${numPad(dt.getHours())}${numPad(dt.getMinutes())}${numPad(dt.getSeconds())}-${numPad(dt.getMilliseconds(), 3)}`;
}


// tslint:disable-next-line: space-before-function-paren
export function toShortDateString(dt: Date): string {
  const locale =
    navigator.language || (navigator.languages && navigator.languages.length > 0) ? navigator.languages[0] : 'en-US';

  return dt?.toLocaleDateString(locale, shortDateOptions);
}
