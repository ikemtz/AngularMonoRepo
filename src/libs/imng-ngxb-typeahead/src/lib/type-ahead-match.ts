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
