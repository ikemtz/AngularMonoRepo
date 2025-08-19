import { readFirst } from 'imng-ngrx-utils/testing';
import { of } from 'rxjs';
import { isModalState } from './is-modal-state';

describe('isModalState', () => {
  it('should work', async () => {
    const result = await readFirst(
      isModalState({ currentModalState$: of('test') }, 'test'),
    );
    expect(result).toBe(true);
  });
});
