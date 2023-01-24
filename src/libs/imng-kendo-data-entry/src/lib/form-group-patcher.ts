import { FormGroup } from '@angular/forms';
import { take, tap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IdType } from 'imng-nrsrx-client-utils';

export const formGroupPatcher =
  <
    TEntity extends {
      id?: IdType | null;
    },
  >(
    addEditForm: FormGroup,
  ) =>
  (source: Observable<TEntity | undefined>) =>
    source.pipe(
      filter((t) => !!t),
      take(1),
      tap((t) => {
        if (t) {
          addEditForm.patchValue(t);
        }
      }),
    );
