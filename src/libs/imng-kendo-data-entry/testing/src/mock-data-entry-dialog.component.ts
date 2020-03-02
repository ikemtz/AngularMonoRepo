import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import { DataEntryMockFacade } from '.';

export class MockDataEntryComponent extends BaseDataEntryComponent<object, DataEntryMockFacade> {
  public dialogTitle = 'MockDataEntryComponent';
  public props = {};
  public initForm() {}
  public save = () => jest.fn(() => {});
}
