import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

export class ImngTypeaheadMatch<T> extends TypeaheadMatch {
  constructor(
    public override readonly item: T,
    public override readonly value: string,
    protected override readonly header = false
  ) {
    super(item, value, header);
  }
}
