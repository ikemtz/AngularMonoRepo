import { ImngEditableDataGridDirective } from './imng-editable-data-grid.directive';

describe('ImngEditableDataGridDirective', () => {
  it('should create an instance', () => {
    const gridComponent: any = {};
    const changeDetectorRef: any = {};
    const directive = new ImngEditableDataGridDirective(gridComponent, changeDetectorRef);
    expect(directive).toBeTruthy();
  });
});
