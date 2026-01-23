import { TestBed } from '@angular/core/testing';
import { CustomersModule } from './customers.module';

describe('CustomersModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomersModule],
    }).compileComponents();
  });

  test('should create', () => {
    expect(CustomersModule).toBeDefined();
    const module = new CustomersModule();
    expect(module).toBeTruthy();
  });
});
