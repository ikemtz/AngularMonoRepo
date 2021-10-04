import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImngGridChildColumnTemplateComponent } from './kendo-child-column-template.component';

describe('ImngGridChildColumnTemplateComponent', () => {
  let component: ImngGridChildColumnTemplateComponent;
  let fixture: ComponentFixture<ImngGridChildColumnTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImngGridChildColumnTemplateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImngGridChildColumnTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.currentData).toStrictEqual([]);
  });

  it('should formatToolTip', () => {
    component.data = [{ id: 'x' }, { id: 'y' }, { id: 'z' }];
    component.field = 'id';
    component.visibleRecCount = 1;
    component.ngAfterViewInit();
    expect(component.formatToolTip()).toBe('y ; z');
    expect(component.currentData).toStrictEqual([{ id: 'x' }, { id: 'y' }, { id: 'z' }]);
  });

  it('moreClicked should emit', async () => {
    component.showMoreClicked.emit = jest.fn();
    component.data = [{ id: 'x' }, { id: 'y' }, { id: 'z' }];
    component.field = 'id';
    component.visibleRecCount = 1;
    component.ngAfterViewInit();
    component.moreClicked();
    expect(component.showMoreClicked.emit).toHaveBeenCalledWith([{ id: 'x' }, { id: 'y' }, { id: 'z' }]);
  });
});
