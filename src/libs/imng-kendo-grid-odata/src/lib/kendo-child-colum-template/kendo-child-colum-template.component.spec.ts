import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImngGridChildColumTemplateComponent } from './kendo-child-colum-template.component';

describe('ImngGridChildColumTemplateComponent', () => {
  let component: ImngGridChildColumTemplateComponent;
  let fixture: ComponentFixture<ImngGridChildColumTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImngGridChildColumTemplateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImngGridChildColumTemplateComponent);
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
