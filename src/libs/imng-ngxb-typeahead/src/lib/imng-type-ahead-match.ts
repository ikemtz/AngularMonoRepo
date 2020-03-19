import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

export class ImngTypeaheadMatch<T> extends TypeaheadMatch {
  constructor(public readonly item: T, public readonly value: string, protected readonly header: boolean = false) {
    super(item, value, header);
  }
  isHeader(): boolean {
    return this.header;
  }
  toString(): string {
    return this.value;
  }
}

export class ImngMatchSelectedEvent<T> {
  constructor(
    public readonly item: ImngTypeaheadMatch<T>,
    public readonly value: string,
    public readonly header = false,
  ) {
    value = value || item.value;
  }
  isHeader(): boolean {
    return this.header;
  }
  toString(): string {
    return this.value;
  }
}
