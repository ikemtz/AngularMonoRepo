import { mapPagerSettings } from './kendo-odata-grid-rxjs-operators';
import { of } from 'rxjs';
import { readFirst } from 'imng-ngrx-utils/testing';
import { PagerSettings } from '@progress/kendo-angular-grid';

describe('Testing mapPagerSettings', () => {
  it('should return false ', async () => {
    const mockState = of({});
    const result = await readFirst(mockState.pipe(mapPagerSettings()));
    expect(result).toBe(false);
  });

  it('should return false if gridODataState is null', async () => {
    const mockState = of({ gridODataState: null, gridData: { total: 50, data: [] } });
    const result = await readFirst(mockState.pipe(mapPagerSettings()));
    expect(result).toBe(false);
  });
  it('should return false if gridODataState.take is null', async () => {
    const mockState = of({ gridODataState: { take: 0 }, gridData: { total: 50, data: [] } });
    const result = await readFirst(mockState.pipe(mapPagerSettings()));
    expect(result).toBe(false);
  });

  it('should return false if gridData is undefined', async () => {
    const mockState = of({ gridODataState: { take: 50 }, gridData: null });
    const result = await readFirst(mockState.pipe(mapPagerSettings()));
    expect(result).toBe(false);
  });

  it('should return false if gridData.total is undefined', async () => {
    const mockState = of({ gridODataState: { take: 50 }, gridData: { total: undefined, data: [] } });
    const result = await readFirst(mockState.pipe(mapPagerSettings()));
    expect(result).toBe(false);
  });

  it('should return be maxed out (10) ', async () => {
    const mockState = of({
      gridODataState: { take: 10 },
      gridData: { total: 1000 },
    } as unknown);
    const result = (await readFirst(mockState.pipe(mapPagerSettings()))) as PagerSettings;
    expect(result).toBeTruthy();
    expect(result.buttonCount).toBe(10);
  });

  it('should return be 9 ', async () => {
    const mockState = of({
      gridODataState: { take: 10 },
      gridData: { total: 89 },
    } as unknown);
    const result = (await readFirst(mockState.pipe(mapPagerSettings()))) as PagerSettings;
    expect(result).toBeTruthy();
    expect(result.buttonCount).toBe(9);
  });
});
