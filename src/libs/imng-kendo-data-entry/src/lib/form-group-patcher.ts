import { FormGroup } from '@angular/forms';
import { take, tap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const formGroupPatcher =
  <TEntity>(addEditForm: FormGroup) =>
  (source: Observable<TEntity>) =>
    source.pipe(
      filter((t) => !!t),
      take(1),
      tap((t) => addEditForm.patchValue(t as { [key: string]: unknown })),
    );
