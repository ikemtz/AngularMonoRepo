import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartODataBaseComponent } from 'imng-kendo-chart-odata';
import { ChartODataMockFacade } from './chart-odata-mock-facade';

describe('ChartODataBaseComponent', () => {
  let component: ChartODataBaseComponent<ChartODataMockFacade>;
  let fixture: ComponentFixture<ChartODataMockFacade>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartODataBaseComponent],
    }).compileComponents();
  }));
});
