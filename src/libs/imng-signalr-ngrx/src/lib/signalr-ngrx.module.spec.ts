import { TestBed } from '@angular/core/testing';
import { ImngSignalrNgrxModule } from './signalr-ngrx.module';
import { SIGNALR_CONFIG } from './models/signalr.configuration';

describe('ImngSignalrNgrxModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ImngSignalrNgrxModule],
      providers: [
        { provide: SIGNALR_CONFIG, multi: false, useValue: { hostUrl: 'http://xyz/notificationHub', logLevel: 1 } },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    expect(ImngSignalrNgrxModule).toBeDefined();
  });

  it('should init on forRoot', () => {
    const result = ImngSignalrNgrxModule.forRoot({
      logLevel: 4,
      hostUrl: '/notificationHub',
      clientMethods: ['x'],
    });
    expect(result).toBeTruthy();
  });
});
