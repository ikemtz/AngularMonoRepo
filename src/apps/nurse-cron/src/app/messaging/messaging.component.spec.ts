import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagingComponent } from './messaging.component';
import { SignalrFacade } from 'imng-signalr-ngrx';
import { of } from 'rxjs';

describe('MessagingComponent', () => {
  let component: MessagingComponent;
  let fixture: ComponentFixture<MessagingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MessagingComponent],
      providers: [
        {
          provide: SignalrFacade,
          useValue: {
            isConnected$: of(true),
            dispatchAction: jest.fn(),
            connect: jest.fn(),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and destroy', () => {
    expect(component).toBeTruthy();

    component.ngOnDestroy();
  });
});
