export class DateHelper {
  public static weekOfYear(dt: Date): number {
    return dt.weekOfYear();
  }

  // tslint:disable-next-line: space-before-function-paren
  public static toShortDateString(dt: Date): string {
    return dt.toShortDateString();
  }
}
