import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IMNG_PRIME_SEARCH_CAPTION } from './search-caption.component';

describe('SearchCaptionComponent', () => {
  let component: IMNG_PRIME_SEARCH_CAPTION;
  let fixture: ComponentFixture<IMNG_PRIME_SEARCH_CAPTION>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IMNG_PRIME_SEARCH_CAPTION],
    }).compileComponents();

    fixture = TestBed.createComponent(IMNG_PRIME_SEARCH_CAPTION);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
