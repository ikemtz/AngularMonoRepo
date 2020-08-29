import { of } from 'rxjs';
import { readFirst } from '@nrwl/angular/testing';
import { getSubGridData } from './odata-rxjs-operators';

describe('RxJs Operators', () => {
  it('should be created', async done => {
    const gridData$ = of({
      data: [
        { id: 1, subData: [{ val: 'xyz' }, { val: 123 }] },
        { id: 2, subData: [{ val: 'abc' }, { val: 456 }] },
      ], total: 5000
    });
    try {
      const result = await readFirst(gridData$.pipe(getSubGridData(2, x => x.subData)));
      expect(result).toMatchSnapshot();
      done();
    } catch (err) {
      done.fail(err);
    }
  });
});
