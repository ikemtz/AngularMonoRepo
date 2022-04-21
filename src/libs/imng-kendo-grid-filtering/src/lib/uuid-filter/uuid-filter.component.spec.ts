import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnComponent, FilterService } from '@progress/kendo-angular-grid';
import { UuidFilterComponent } from './uuid-filter.component';

describe('UuidFilterComponent', () => {
  let component: UuidFilterComponent;
  let fixture: ComponentFixture<UuidFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UuidFilterComponent],
      providers: [
        { provide: FilterService, useValue: {} },
        { provide: ColumnComponent, useValue: {} }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UuidFilterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
