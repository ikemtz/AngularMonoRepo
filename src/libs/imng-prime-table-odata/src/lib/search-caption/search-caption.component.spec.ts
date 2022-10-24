import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCaptionComponent } from './search-caption.component';

describe('SearchCaptionComponent', () => {
  let component: SearchCaptionComponent;
  let fixture: ComponentFixture<SearchCaptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCaptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCaptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
