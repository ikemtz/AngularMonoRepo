import { of } from 'rxjs';
import { readFirst } from '@nrwl/angular/testing';
import { getSubGridData, findById, firstRecord } from './odata-rxjs-operators';

describe('RxJs Operators', () => {
  const gridData$ = of({
    data: [
      { id: 1, subData: [{ val: 'xyz' }, { val: 123 }] },
      { id: 2, subData: [{ val: 'abc' }, { val: 456 }] },
    ], total: 5000
  });
  const emptyGridData$ = of({
    data: [], total: 0
  });
  it('should be created', async done => {
    try {
      const result = await readFirst(gridData$.pipe(getSubGridData(2, x => x.subData)));
      expect(result).toMatchSnapshot();
      done();
    } catch (err) {
      done.fail(err);
    }
  });

  it('should findById', async done => {
    try {
      const result = await readFirst(gridData$.pipe(findById(2)));
      expect(result).toMatchSnapshot();
      done();
    } catch (err) {
      done.fail(err);
    }
  });

  it('should not findById', async done => {
    try {
      const result = await readFirst(gridData$.pipe(findById(3)));
      expect(result).toStrictEqual({});
      done();
    } catch (err) {
      done.fail(err);
    }
  });

  it('should match firstRecord', async done => {
    try {
      const result = await readFirst(gridData$.pipe(firstRecord()));
      expect(result).toMatchSnapshot();
      done();
    } catch (err) {
      done.fail(err);
    }
  });

  it('should empty firstRecord', async done => {
    try {
      const result = await readFirst(emptyGridData$.pipe(firstRecord()));
      expect(result).toStrictEqual({});
      done();
    } catch (err) {
      done.fail(err);
    }
  });
});
