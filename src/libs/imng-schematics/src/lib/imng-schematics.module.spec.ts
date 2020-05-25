import { async, TestBed } from '@angular/core/testing';
import { ImngSchematicsModule } from './imng-schematics.module';

describe('ImngSchematicsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ImngSchematicsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ImngSchematicsModule).toBeDefined();
  });
});
