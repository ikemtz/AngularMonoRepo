import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ImngTypeaheadMatch } from './type-ahead-match';

export class ImngMatchSelectedEvent<T> extends TypeaheadMatch {
  constructor(
    public override readonly item: ImngTypeaheadMatch<T>,
    public override readonly value: string,
    public override readonly header = false
  ) {
    super(item, value, header);
    this.value = value || item.value;
  }
}
