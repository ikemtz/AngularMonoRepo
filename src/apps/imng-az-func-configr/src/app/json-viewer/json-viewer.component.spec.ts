import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonViewerComponent } from './json-viewer.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('JsonViewerComponent', () => {
  let component: JsonViewerComponent;
  let fixture: ComponentFixture<JsonViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JsonViewerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should destroy', () => {
    component.ngOnDestroy();
    expect(component.outputSubscription.closed).toBe(true);
  });
});
