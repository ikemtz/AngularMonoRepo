import { ImngEditableDataGridDirective } from './editable-data-grid.directive';
import { of } from 'rxjs';

const gridComponent: any = {
  edit: of({}),
  cancel: of({}),
  save: of({}),
  remove: of({}),
  add: of({}),
};

describe('ImngEditableDataGridDirective', () => {
  it('should create an instance', () => {
    const changeDetectorRef: any = {};
    const directive = new ImngEditableDataGridDirective(gridComponent, changeDetectorRef);
    expect(directive).toBeTruthy();
    directive.ngOnInit();
  });

  it('should destroy an instance', () => {
    const changeDetectorRef: any = {};
    const directive = new ImngEditableDataGridDirective(gridComponent, changeDetectorRef);
    expect(directive).toBeTruthy();
    directive.ngOnInit();
    directive.ngOnDestroy();
  });
});
