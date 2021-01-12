import { BaseDataEntryDirective } from 'imng-kendo-data-entry';
import { DataEntryMockFacade } from './data-entry-mock.facade';

export class MockDataEntryComponent extends BaseDataEntryDirective<DataEntryMockFacade> {
  public dialogTitle = 'MockDataEntryComponent';
  public props = {};
  public initForm = jest.fn();
  public save = () => jest.fn();
}
