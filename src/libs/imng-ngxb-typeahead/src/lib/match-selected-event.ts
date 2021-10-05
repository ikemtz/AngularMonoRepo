import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ImngTypeaheadMatch } from './type-ahead-match';

export class ImngMatchSelectedEvent<T> extends TypeaheadMatch {
  constructor(
    public readonly item: ImngTypeaheadMatch<T>,
    public readonly value: string,
    public readonly header = false,
  ) {
    super(item, value, header);
    this.value = value || item.value;
  }
  public isHeader(): boolean {
    return this.header;
  }
  public toString(): string {
    return this.value;
  }
}
