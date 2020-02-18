import { TestBed } from '@angular/core/testing';
import { GridDataEntryHelper } from './grid-data-entry.helper';
import { FormGroup, FormControl } from '@angular/forms';
import { readFirst, readAll } from '@nrwl/angular/testing';

describe('GridDataEntryHelper<>', () => {
  const gridComponentMock = {
    closeRow: jest.fn(() => {}),
    addRow: jest.fn(() => {}),
  };
  it('should report invalid if gridData is empty ', async done => {
    try {
      const gridHelper = new GridDataEntryHelper(
        () =>
          new FormGroup({
            id: new FormControl(''),
          }),
      );
      expect(gridHelper).toBeDefined();
      const gridDataResult = await readFirst(gridHelper.gridData$);
      expect(gridDataResult).toStrictEqual([]);
      expect(await readFirst(gridHelper.isValid$)).toBe(false);
      expect(await readFirst(gridHelper.isInEditMode$)).toBe(false);
      done();
    } catch (x) {
      done.fail(x);
    }
  });
  it('should report invalid if gridData is inEditMode ', async done => {
    try {
      const gridHelper = new GridDataEntryHelper(
        () =>
          new FormGroup({
            id: new FormControl(''),
          }),
        [{ id: '😎😎' }],
      );
      gridHelper.addHandler({ sender: gridComponentMock });
      expect(await readFirst(gridHelper.isValid$)).toBe(false);
      expect(await readFirst(gridHelper.isInEditMode$)).toBe(true);
      done();
    } catch (x) {
      done.fail(x);
    }
  });

  it('should report valid ', async done => {
    try {
      const gridHelper = new GridDataEntryHelper(
        () =>
          new FormGroup({
            id: new FormControl(''),
          }),
        [{ id: '😎😎' }],
      ); 
      expect(await readFirst(gridHelper.isValid$)).toBe(true);
      expect(await readFirst(gridHelper.isInEditMode$)).toBe(false);

      done();
    } catch (x) {
      done.fail(x);
    }
  });
});
