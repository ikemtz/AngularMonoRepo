import { DAYS_PER_WEEK, MILLI_SECS_PER_DAY, shortDateOptions } from './date.extensions';

export function weekOfYear(dt: Date): number {
  const onejan = new Date(dt.getFullYear(), 0, 1);
  return Math.ceil(((dt.getTime() - onejan.getTime()) / MILLI_SECS_PER_DAY + onejan.getDay() + 1) / DAYS_PER_WEEK);
}

// tslint:disable-next-line: space-before-function-paren
export function toShortDateString(dt: Date): string {
  const locale =
    navigator.language || (navigator.languages && navigator.languages.length > 0) ? navigator.languages[0] : 'en-US';

  return dt?.toLocaleDateString(locale, shortDateOptions);
}
