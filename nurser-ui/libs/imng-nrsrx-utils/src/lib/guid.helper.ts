export class GuidHelper {
  private static readonly regex = /[a-h0-9]{8}-[a-h0-9]{4}-[a-h0-9]{4}-[a-h0-9]{4}-[a-h0-9]{12}/gmi;
  public static minimize(str: string): string {
    let m: RegExpExecArray | null;
    while ((m = this.regex.exec(str)) !== null) {
      m.forEach(element => {
        str = str.replace(element, element.replace(/-/g, ''));
      });
    }
    return str;
  }
}
