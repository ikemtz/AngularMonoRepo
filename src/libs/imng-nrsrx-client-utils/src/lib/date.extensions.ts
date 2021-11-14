import { toShortDateString, weekOfYear } from './date.helper';

declare global {
  export interface Date {
    toShortDateString(): string;
    weekOfYear(): number;
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
  Date.prototype.toShortDateString = function (this: Date): string {
    return toShortDateString(this);
  };
}

if (!Date.prototype.weekOfYear) {
  //NOSONAR
  // tslint:disable-next-line: space-before-function-paren
  Date.prototype.weekOfYear = function (this: Date): number {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    return weekOfYear(this);
  };
}
export {};
