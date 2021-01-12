import { mapPagerSettings } from './kendo-odata-grid-rxjs-operators';
import { of } from 'rxjs';
import { readFirst } from '@nrwl/angular/testing';
import { PagerSettings } from '@progress/kendo-angular-grid';

describe('Testing mapPagerSettings', () => {
  it('should return false ', async done => {
    try {
      const mockState = of({

      });
      const result = await readFirst(mockState.pipe(mapPagerSettings()));
      expect(result).toBe(false);
      done();
    } catch (err) {
      done.fail(err);
    }
  });

  it('should return be maxed out (10) ', async done => {
    try {
      const mockState = of({
        gridODataState: { take: 10 },
        gridData: { total: 1000 }
      } as unknown);
      const result = await readFirst(mockState.pipe(mapPagerSettings())) as PagerSettings;
      expect(result).toBeTruthy();
      expect(result.buttonCount).toBe(10);
      done();
    } catch (err) {
      done.fail(err);
    }
  });

  it('should return be 9 ', async done => {
    try {
      const mockState = of({
        gridODataState: { take: 10 },
        gridData: { total: 89 }
      } as unknown);
      const result = await readFirst(mockState.pipe(mapPagerSettings())) as PagerSettings;
      expect(result).toBeTruthy();
      expect(result.buttonCount).toBe(9);
      done();
    } catch (err) {
      done.fail(err);
    }
  });
});
