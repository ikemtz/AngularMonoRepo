import { async, TestBed } from '@angular/core/testing';
import { ImngMsalNgrxModule } from './imng-msal-ngrx.module';

describe('ImngMsalNgrxModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ImngMsalNgrxModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ImngMsalNgrxModule).toBeDefined();
  });
});
