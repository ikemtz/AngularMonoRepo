import { DataEntryFacade } from '..';
import { of } from 'rxjs';

export class DataEntryTestFacade implements DataEntryFacade<object> {
  loading$ = of(false);
  currentEntity$ = of(null);
  isEditActive$ = of(false);
  isNewActive$ = of(false);
  clearCurrentEntity(): void {}
  saveNewEntity(entity: object): void {}
  updateExistingEntity(entity: object): void {}
}
