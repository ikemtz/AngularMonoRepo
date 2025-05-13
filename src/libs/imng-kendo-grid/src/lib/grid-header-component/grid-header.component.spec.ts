import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridComponent } from '@progress/kendo-angular-grid';
import { ImngGridHeaderComponent } from './grid-header.component';

describe('ImngGridHeaderComponent', () => {
  let component: ImngGridHeaderComponent;
  let fixture: ComponentFixture<ImngGridHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImngGridHeaderComponent],
      providers: [
        {
          provide: GridComponent,
          useValue: {},
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImngGridHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should support hideReloadData = true', () => {
    component.hideReloadData = true;
    const element = fixture.nativeElement;
    expect(element.innerHTML).toMatchSnapshot();
  });

  it('should support hideReloadData = false', () => {
    component.hideReloadData = false;
    const element = fixture.nativeElement;
    expect(element.innerHTML).toMatchSnapshot();
  });

  it('should support hideResetFilters = true', () => {
    component.hideResetFilters = true;
    const element = fixture.nativeElement;
    expect(element.innerHTML).toMatchSnapshot();
  });

  it('should support hideResetFilters = false', () => {
    component.hideResetFilters = false;
    const element = fixture.nativeElement;
    expect(element.innerHTML).toMatchSnapshot();
  });
});
