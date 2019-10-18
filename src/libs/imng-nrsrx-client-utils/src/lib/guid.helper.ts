export class GuidHelper {
  private static readonly guidSegmentCriteria = `[a-f0-9]`;
  private static readonly guidRegexWithDashes = new RegExp(`${GuidHelper.guidSegmentCriteria}{8}-${GuidHelper.guidSegmentCriteria}{4}-${GuidHelper.guidSegmentCriteria}{4}-${GuidHelper.guidSegmentCriteria}{4}-${GuidHelper.guidSegmentCriteria}`, 'gim');
  private static readonly dashRegex = new RegExp('-', 'g');
  public static minimize(str: string): string {
    let m: RegExpExecArray | null;
    while ((m = this.guidRegexWithDashes.exec(str)) !== null) {
      m.forEach(element => {
        str = str.replace(element, element.replace(this.dashRegex, ''));
      });
    }
    return str;
  }
}
