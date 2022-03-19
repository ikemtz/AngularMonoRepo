import { of } from 'rxjs';
import { readFirst } from 'imng-ngrx-utils/testing';
import { getSubGridData, findById, firstRecord, getSubData, mapToExtDataResult } from './odata-rxjs-operators';
import { map } from 'rxjs/operators';

describe('RxJs Operators', () => {
  const gridData$ = of({
    data: [
      { id: 1, subData: [{ val: 'xyz' }, { val: 123 }] },
      { id: 2, subData: [{ val: 'abc' }, { val: 456 }] },
    ],
    total: 5000,
  });
  const emptyGridData$ = of({
    data: [],
    total: 0,
  });

  it('mapToExtDataResult should function', async () => {
    const result = await readFirst(
      gridData$.pipe(
        map((t) => ({
          value: t.data,
          '@odata.count': t.data.length,
        })),
        mapToExtDataResult(),
      ),
    );
    expect(result).toMatchSnapshot();
  });

  it('mapToExtDataResult should handle Arrays', async () => {
    const result = await readFirst(
      gridData$.pipe(
        map((t) => t.data),
        mapToExtDataResult(),
      ),
    );
    expect(result).toMatchSnapshot();
  });

  it('mapToExtDataResult should handle null', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await readFirst(of(null as any).pipe(mapToExtDataResult()));
    expect(result).toMatchSnapshot();
  });

  it('getSubGridData should function', async () => {
    const result = await readFirst(gridData$.pipe(getSubGridData(2, (x) => x.subData)));
    expect(result).toMatchSnapshot();
  });

  it('getSubData should function', async () => {
    const result = await readFirst(
      gridData$.pipe(
        map((t) => t.data),
        getSubData(2, (x) => x.subData),
      ),
    );
    expect(result).toMatchSnapshot();
  });

  it('should be created', async () => {
    const result = await readFirst(gridData$.pipe(getSubGridData(2, (x) => x.subData)));
    expect(result).toMatchSnapshot();
  });

  it('should findById', async () => {
    const result = await readFirst(gridData$.pipe(findById(2)));
    expect(result).toMatchSnapshot();
  });

  it('findById handle undefined objects', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await readFirst(of(null as any).pipe(findById(2))); //NOSONAR
    expect(result).toMatchSnapshot();
  });

  it('findById handle undefined datasets', async () => {
    const result = await readFirst(of({ data: [], total: 0 }).pipe(findById(2)));
    expect(result).toMatchSnapshot();
  });

  it('should not findById', async () => {
    const result = await readFirst(gridData$.pipe(findById(3)));
    expect(result).toStrictEqual({});
  });

  it('should match firstRecord', async () => {
    const result = await readFirst(gridData$.pipe(firstRecord()));
    expect(result).toMatchSnapshot();
  });

  it('should empty firstRecord', async () => {
    const result = await readFirst(emptyGridData$.pipe(firstRecord()));
    expect(result).toStrictEqual({});
  });
  it('firstRecord handle undefined objects', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await readFirst(of(null as any).pipe(firstRecord()));
    expect(result).toMatchSnapshot();
  });

  it('firstRecord handle undefined datasets', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await readFirst(of({ data: undefined as any, total:0 }).pipe(firstRecord()));
    expect(result).toMatchSnapshot();
  });
});
