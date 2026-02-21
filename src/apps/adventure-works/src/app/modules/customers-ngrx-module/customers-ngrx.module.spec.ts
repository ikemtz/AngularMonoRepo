import { TestBed } from '@angular/core/testing';
import { CustomersNgrxModule } from './customers-ngrx.module';

describe('CustomersNgrxModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomersNgrxModule],
    }).compileComponents();
  });

  test('should create', () => {
    expect(CustomersNgrxModule).toBeDefined();
    const module = new CustomersNgrxModule();
    expect(module).toBeTruthy();
  });
});
