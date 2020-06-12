import { testAddSetAndClearCurrentEntity } from '.';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { isTruthy } from 'imng-ngrx-utils';
import { testEditSetAndClearCurrentEntity } from './data-entry-facade-tests';

describe('TestAddSetAndClearCurrentEntity', () => {
    it('New Entity Set And Clear CurrentEntity', async done =>
        testAddSetAndClearCurrentEntity<TestFacade>(done, new TestFacade()));
});

describe('TestEditSetAndClearCurrentEntity', () => {
    it('Existing Entity Set And Clear CurrentEntity', async done =>
        testEditSetAndClearCurrentEntity<TestFacade>(done, new TestFacade()));
});

class TestFacade {
    entity$ = new BehaviorSubject<{ id: string, name: string; }>(null);
    currentEntity$ = this.entity$.asObservable();
    isEditActive$ = this.currentEntity$.pipe(map(m => m && isTruthy(m.id)));
    isNewActive$ = this.entity$.pipe(map(m => m && !isTruthy(m.id)));
    setCurrentEntity(entity: { id: string, name: string; }, parentEntity?: unknown): void {
        this.entity$.next(entity);
    }
    clearCurrentEntity(): void {
        this.entity$.next(null);
    }

}
