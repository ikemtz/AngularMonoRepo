import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KendoChartODataComponentBaseComponent } from './kendo-chart-odata-base.component';

describe('KendoChartODataComponentBaseComponent', () => {
  let component: KendoChartODataComponentBaseComponent;
  let fixture: ComponentFixture<KendoChartODataComponentBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KendoChartODataComponentBaseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KendoChartODataComponentBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
