export class DateHelper {
  public static readonly millisecsInDay = 86400000;
  public static weekOfYear(dt: Date): number {
    const onejan = new Date(dt.getFullYear(), 0, 1);
    return Math.ceil(((dt.getTime() - onejan.getTime()) / DateHelper.millisecsInDay + onejan.getDay() + 1) / 7);
  }
}
