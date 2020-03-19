import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

export class ImngTypeaheadMatch<T> extends TypeaheadMatch {
  constructor(public readonly item: T, public readonly value: string, protected readonly header: boolean = false) {
    super(item, value, header);
  }
  public isHeader(): boolean {
    return this.header;
  }
  public toString(): string {
    return this.value;
  }
}

export class ImngMatchSelectedEvent<T> extends TypeaheadMatch {
  constructor(
    public readonly item: ImngTypeaheadMatch<T>,
    public readonly value: string,
    public readonly header = false,
  ) {
    super(item, value, header);
    value = value || item.value;
  }
  public isHeader(): boolean {
    return this.header;
  }
  public toString(): string {
    return this.value;
  }
}
