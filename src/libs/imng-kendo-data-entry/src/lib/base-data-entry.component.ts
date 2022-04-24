import {
  Directive,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
} from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { IBaseDataEntryFacade } from './data-entry-facade';
import { Subscribable, Subscriptions } from 'imng-ngrx-utils';

const FACADE = new InjectionToken<IBaseDataEntryFacade>(
  'imng-data-entry-facade'
);

/**
 * The extending class has to implement the following properties on ngInit
 * dialogTitle: string - This will be the text displayed at the top of the modal title bar
 * props: enum - This is a helper property to make the html markup type safe
 *
 * Along with the requirements above, the extending class has to set values to the
 * following properties on ngInit
 * active$: Observable<boolean> - This typically would be assigned to the isNewActive$ or isEditActive on the facade
 * addEditForm: FormGroup - This will be created by your component
 *
 * @class BaseDataEntryComponent>
 */
@Directive()
export abstract class BaseDataEntryComponent<
  FACADE extends IBaseDataEntryFacade
  > implements OnDestroy, Subscribable {
  @Input() public width: string | number = 800; //NOSONAR
  @Input() public height: string | number = 600; //NOSONAR
  public readonly MinLengthError = "minlength";
  public readonly RequiredError = "required";
  public allSubscriptions = new Subscriptions();
  public abstract dialogTitle: string;
  public abstract props: unknown;
  public addEditForm: FormGroup = new FormGroup({});
  public loading$: Observable<boolean>;
  private readonly _submitted$: BehaviorSubject<boolean> = new BehaviorSubject(
    false as boolean
  );

  public get submitted$(): Observable<boolean> {
    return this._submitted$.asObservable();
  }
  // convenience getter for easy access to form fields
  public formControl(controlName: string): AbstractControl | undefined {
    return this.addEditForm?.controls[controlName];
  }
  public formControlErrors(controlName: string): ValidationErrors | null {
    return this.addEditForm.controls[controlName].errors;
  }
  public formMinLengthError(controlName: string): { requiredLength: number, actualLength: number; } | null {
    return this.formControlErrors(controlName)?.[this.MinLengthError];
  }
  public getFormErrors(): { control: string, error: ValidationErrors; }[] {
    const errors: { control: string, error: ValidationErrors; }[] = [];
    for (const control of Object.keys(this.addEditForm.controls)) {
      const error = this.formControlErrors(control);
      if (error) {
        errors.push({ control, error });
      }
    }
    return errors;
  }
  constructor(@Inject(FACADE) public readonly facade: FACADE) {
    this.loading$ = this.facade.loading$;
    this.initForm();
  }

  public ngOnDestroy(): void {
    this.allSubscriptions.unsubscribeAll();
  }

  public closeForm(): void {
    this.initForm();
    this.facade.clearCurrentEntity();
    this._submitted$.next(false);
  }

  public onCancel(): void {
    this.closeForm();
  }

  public onSubmit(): void {
    this._submitted$.next(true);

    // stop here if form is invalid
    if (this.isDataInvalid()) {
      console.error('form validation errors.'); //NOSONAR
      return;
    }
    this.save();
    this.closeForm();
  }

  public isDataInvalid(): boolean | undefined {
    return this.addEditForm?.invalid;
  }

  public abstract initForm(): void;
  public abstract save(): void;
}
