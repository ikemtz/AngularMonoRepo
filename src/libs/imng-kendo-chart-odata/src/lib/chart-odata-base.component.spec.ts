import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartODataBaseComponent } from './chart-odata-base.component';
import { ChartODataMockFacade, createChartODataMockFacade } from '../../testing/src/chart-odata-mock-facade';
import { Component } from '@angular/core';

describe('ChartODataBaseComponent', () => {
  let component: ChartODataTestComponent;
  let fixture: ComponentFixture<ChartODataTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartODataTestComponent],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartODataTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'imng-test-component',
  template: '<h1></h1>',
})
export class ChartODataTestComponent extends ChartODataBaseComponent<ChartODataMockFacade> {
  constructor() {
    super(createChartODataMockFacade());
  }
  public loadChart = () => jest.fn();
}
