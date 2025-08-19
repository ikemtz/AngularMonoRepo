import { Observable, map, of } from 'rxjs';

export function isModalState(
  facade: { currentModalState$: Observable<string | undefined> },
  expectedModalState: string,
): Observable<boolean> {
  return (
    facade.currentModalState$?.pipe(
      map((currentModalState) => currentModalState === expectedModalState),
    ) || of(false)
  );
}
