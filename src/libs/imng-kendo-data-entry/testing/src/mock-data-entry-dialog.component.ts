// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import { DataEntryMockFacade } from './data-entry-mock.facade';

export class MockDataEntryComponent extends BaseDataEntryComponent<DataEntryMockFacade> {
  public dialogTitle = 'MockDataEntryComponent';
  public props = {};
  public initForm = jest.fn();
  public save = () => jest.fn();
}
