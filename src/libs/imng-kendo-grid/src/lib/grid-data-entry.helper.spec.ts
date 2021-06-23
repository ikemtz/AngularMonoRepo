import { GridDataEntryHelper } from './grid-data-entry.helper';
import { FormGroup, FormControl } from '@angular/forms';
import { readFirst } from 'imng-ngrx-utils/testing';
import { formGroupFac } from './editable-data-grid.directive.spec';
import { AddEvent, GridComponent } from '@progress/kendo-angular-grid';

export const gridComponentMockFac = () =>
({
  closeRow: jest.fn(),
  addRow: jest.fn(),
  editRow: jest.fn(),
} as unknown as GridComponent);
describe('GridDataEntryHelper<>', () => {
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
      gridHelper.addHandler({ sender: gridComponentMockFac(), dataItem: {} } as AddEvent);
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
      const gridHelper = new GridDataEntryHelper(formGroupFac, [{ id: '💩' }, { id: '🐂' }, { id: '🥜' }]);

      gridHelper.saveHandler({
        formGroup: formGroupFac(),
        dataItem: {},
        isNew: false,
        rowIndex: 1,
        sender: gridComponentMockFac(),
      });
      const result = await readFirst(gridHelper.gridData$);
      expect(result).toMatchSnapshot();
      expect((result[1] as unknown as { test: string; }).test).toBe('👍');
      done();
    } catch (x) {
      done.fail(x);
    }
  });

  it('should handle saving new records ', async done => {
    try {
      const gridHelper = new GridDataEntryHelper(formGroupFac, [{ id: '💩', test: 'i' }, { id: '🐂' }, { id: '🥜' }]);

      gridHelper.saveHandler({
        formGroup: formGroupFac(),
        dataItem: {},
        isNew: true,
        rowIndex: 4,
        sender: gridComponentMockFac(),
      });
      const result = await readFirst(gridHelper.gridData$);
      expect(result).toMatchSnapshot();
      const newRec = result[3];
      expect(newRec.id).toBeNull();
      expect(newRec.test).toBe('👍');
      done();
    } catch (x) {
      done.fail(x);
    }
  });

  it('should editHandler', async done => {
    try {
      const gridHelper = new GridDataEntryHelper(formGroupFac, [{ id: '💩' }, { id: '🐂' }, { id: '🥜' }]);
      const gridComponentMock = gridComponentMockFac();
      gridHelper.editHandler({
        dataItem: {},
        isNew: true,
        rowIndex: 4,
        sender: gridComponentMock,
      });
      expect(gridHelper.gridFormGroup).toBeTruthy();
      expect(gridHelper.gridFormGroup.value).toMatchSnapshot();
      expect(gridComponentMock.editRow).toBeCalledTimes(1);
      expect(gridComponentMock.closeRow).toBeCalledTimes(1);
      expect(gridComponentMock.closeRow).toHaveBeenNthCalledWith(1, 4);
      done();
    } catch (x) {
      done.fail(x);
    }
  });

  it('should cancelHandler', async done => {
    try {
      const gridHelper = new GridDataEntryHelper(formGroupFac, [{ id: '💩' }, { id: '🐂' }, { id: '🥜' }]);
      const gridComponentMock = gridComponentMockFac();
      gridHelper.cancelHandler({
        dataItem: {},
        isNew: true,
        rowIndex: 4,
        sender: gridComponentMock,
        formGroup: formGroupFac(),
      });
      expect(gridHelper.gridFormGroup).toBeFalsy();
      expect(gridComponentMock.editRow).toBeCalledTimes(0);
      expect(gridComponentMock.closeRow).toBeCalledTimes(1);
      expect(gridComponentMock.closeRow).toHaveBeenNthCalledWith(1, 4);
      done();
    } catch (x) {
      done.fail(x);
    }
  });

  it('should removeHandler', async done => {
    try {
      const gridHelper = new GridDataEntryHelper(formGroupFac, [{ id: '💩' }, { id: '🐂' }, { id: '🥜' }]);
      const gridComponentMock = gridComponentMockFac();
      gridHelper.removeHandler({
        dataItem: { id: '🐂' },
        isNew: true,
        rowIndex: 2,
        sender: gridComponentMock,
      });
      expect(gridHelper.gridFormGroup).toBeFalsy();
      expect(gridComponentMock.editRow).toBeCalledTimes(0);
      expect(gridComponentMock.closeRow).toBeCalledTimes(0);
      expect(await readFirst(gridHelper.gridData$)).toMatchSnapshot();
      expect(gridHelper.gridData.length).toBe(2);
      done();
    } catch (x) {
      done.fail(x);
    }
  });

  it('should handle add', async done => {
    try {
      const gridHelper = new GridDataEntryHelper(formGroupFac, [{ id: '💩' }, { id: '🐂' }, { id: '🥜' }]);
      gridHelper.addItems({ id: '🐂' });
      expect(await readFirst(gridHelper.gridData$)).toMatchSnapshot();
      expect(gridHelper.gridData.length).toBe(4);
      done();
    } catch (x) {
      done.fail(x);
    }
  });

  it('should handle remove', async done => {
    try {
      const gridHelper = new GridDataEntryHelper(formGroupFac, [{ id: '💩' }, { id: '🐂' }, { id: '🥜' }]);
      gridHelper.removeItems({ id: '😜' });
      expect(gridHelper.gridData.length).toBe(3);
      gridHelper.removeItems(gridHelper.gridData[2]);
      expect(gridHelper.gridData.length).toBe(2);
      expect(await readFirst(gridHelper.gridData$)).toMatchSnapshot();
      done();
    } catch (x) {
      done.fail(x);
    }
  });

  it('should handle sorting', async done => {
    try {
      const gridHelper = new GridDataEntryHelper(formGroupFac, [{ id: 'C' }, { id: 'A' }, { id: 'B' }]);
      gridHelper.sortHandler([{ field: 'id', dir: 'desc' }]);
      expect(await readFirst(gridHelper.gridData$)).toMatchSnapshot('desc');
      expect(await readFirst(gridHelper.sortDescriptors$)).toStrictEqual([{ field: 'id', dir: 'desc' }]);
      gridHelper.sortHandler([{ field: 'id', dir: 'asc' }]);
      expect(await readFirst(gridHelper.gridData$)).toMatchSnapshot('asc');
      expect(await readFirst(gridHelper.sortDescriptors$)).toStrictEqual([{ field: 'id', dir: 'asc' }]);
      done();
    } catch (x) {
      done.fail(x);
    }
  });
});
