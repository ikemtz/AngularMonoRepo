import { TestBed } from '@angular/core/testing';
import { GridDataEntryHelper } from './grid-data-entry.helper';
import { FormGroup, FormControl } from '@angular/forms';
import { readFirst } from '@nrwl/angular/testing';

describe('GridDataEntryHelper<>', () => {
  const gridComponentMock: any = {
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
      expect(gridHelper.isValid).toBe(false);
      expect(gridHelper.isInEditMode).toBe(false);
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
      gridHelper.addHandler({ sender: gridComponentMock, dataItem: {} } as any);
      expect(await readFirst(gridHelper.isValid$)).toBe(false);
      expect(gridHelper.isValid).toBe(false);
      expect(gridHelper.isInEditMode).toBe(true);
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
      expect(gridHelper.isValid).toBe(true);
      expect(gridHelper.isInEditMode).toBe(false);

      done();
    } catch (x) {
      done.fail(x);
    }
  });

  it('should handle saving edited records ', async done => {
    try {
      const formGroupFac = () =>
        new FormGroup({
          id: new FormControl('🐂'),
          test: new FormControl('👍'),
        });
      const gridHelper = new GridDataEntryHelper(formGroupFac, [{ id: '💩' }, { id: '🐂' }, { id: '🥜' }]);

      gridHelper.saveHandler({
        formGroup: formGroupFac(),
        dataItem: {},
        isNew: false,
        rowIndex: 1,
        sender: gridComponentMock,
      });
      const result = await readFirst(gridHelper.gridData$);
      expect(result).toMatchSnapshot();
      expect((result[1] as any).test).toBe('👍');
      done();
    } catch (x) {
      done.fail(x);
    }
  });
});
