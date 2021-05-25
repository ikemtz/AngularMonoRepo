import { BaseDataEntryComponent } from 'imng-kendo-data-entry';

export class MockDataEntryComponent extends BaseDataEntryComponent {
  public dialogTitle = 'MockDataEntryComponent';
  public props = {};
  public initForm = jest.fn();
  public save = () => jest.fn();
}
