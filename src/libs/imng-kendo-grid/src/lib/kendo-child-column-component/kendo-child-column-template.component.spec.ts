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
    component.field = 'id';
    component.visibleRecCount = 1;
    component.data = [{ id: 'x' }, { id: 'y' }, { id: 'z' }, { id: 3 }];
    expect(component.formatToolTip()).toBe('y; z; 3');
    expect(component.currentData).toStrictEqual(['x', 'y', 'z', 3]);
  });

  it('moreClicked should emit', async () => {
    component.showMoreClicked.emit = jest.fn();
    component.moreClicked();
    expect(component.showMoreClicked.emit).toHaveBeenCalledTimes(1);
    expect(component.showMoreClicked.emit).toHaveBeenCalledWith();
  });
});
