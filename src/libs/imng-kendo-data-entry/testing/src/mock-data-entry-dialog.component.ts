import { FormControl, FormGroup } from '@angular/forms';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import { DataEntryMockFacade } from './data-entry-mock.facade';

export class MockDataEntryComponent extends BaseDataEntryComponent<DataEntryMockFacade> {
  public dialogTitle = 'MockDataEntryComponent';
  public override addEditForm = new FormGroup({
    id: new FormControl<string>(''),
  });
  public props = {};
  public initForm = jest.fn();
  public save = () => jest.fn();
}
