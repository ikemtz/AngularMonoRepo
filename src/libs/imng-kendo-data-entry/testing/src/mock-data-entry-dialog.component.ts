import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import { createDataEntryMockFacade, DataEntryMockFacade } from './data-entry-mock-facade';

export class MockDataEntryComponent extends BaseDataEntryComponent<object, DataEntryMockFacade> {
  public dialogTitle = 'MockDataEntryComponent';
  public props = {};
  public initForm() {}
  public save = () => jest.fn(() => {});
}
