import {
  Component,
  Inject,
  InjectionToken,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  AbstractControl,
  ValidationErrors,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { IBaseDataEntryFacade } from './data-entry-facade';
import { Subscribable, Subscriptions } from 'imng-ngrx-utils';
import { EnumProperties } from 'openapi-ts-generator/enums';

const FACADE = new InjectionToken<IBaseDataEntryFacade>(
  'imng-data-entry-facade',
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
@Component({
    template: '',
    standalone: false
})
export abstract class BaseDataEntryComponent<
    FACADE extends IBaseDataEntryFacade,
  >
  implements OnInit, OnDestroy, Subscribable
{
  @Input() public width: string | number = 800; //NOSONAR
  @Input() public height: string | number = 600; //NOSONAR

  public formId = 'imng-form';
  public cancelButtonText = 'Cancel';
  public submitButtonText = 'Submit';
  public readonly MinLengthError = 'minlength';
  public readonly RequiredError = 'required';
  public readonly EnumProperties = EnumProperties;
  public allSubscriptions = new Subscriptions();
  public abstract dialogTitle: string;
  public abstract props: unknown;
  public abstract addEditForm: FormGroup;
  public loading$: Observable<boolean>;
  public readonly submitted$: BehaviorSubject<boolean> = new BehaviorSubject(
    false as boolean,
  );

  constructor(@Inject(FACADE) public readonly facade: FACADE) {
    this.loading$ = this.facade.loading$;
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public ngOnDestroy(): void {
    this.allSubscriptions.unsubscribeAll();
  }

  public closeForm(): void {
    this.initForm();
    this.facade.clearCurrentEntity();
    this.submitted$.next(false);
  }

  public onCancel(): void {
    this.closeForm();
  }

  public onSubmit(): boolean {
    this.submitted$.next(true);
    this.addEditForm.markAllAsTouched();
    // stop here if form is invalid
    if (!this.addEditForm.valid) {
      console.error('form validation errors.'); //NOSONAR
      console.error(JSON.stringify(this.getFormErrors())); //NOSONAR
      return false;
    }
    this.save();
    this.closeForm();
    return true;
  }

  public isDataInvalid(): boolean {
    return this.addEditForm.invalid;
  }

  // convenience getter for easy access to form fields
  public formControl(
    controlName: string,
    controls: { [key: string]: AbstractControl } = this.addEditForm.controls,
  ): AbstractControl {
    return controls[controlName];
  }

  public formControlErrors(
    control: string | AbstractControl,
    controls: { [key: string]: AbstractControl } | AbstractControl[] = this
      .addEditForm.controls,
  ): ValidationErrors | null {
    const tempControl =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typeof control === 'string' ? (controls as any)[control] : control;
    if (tempControl?.valid && !tempControl?.errors) {
      return null;
    }
    return tempControl?.errors;
  }
  public formMinLengthError(
    controlName: string,
  ): { requiredLength: number; actualLength: number } | null {
    return this.formControlErrors(controlName)?.[this.MinLengthError];
  }
  public getFormErrors(
    controls: { [key: string]: AbstractControl } | AbstractControl[] = this
      .addEditForm.controls,
    parentControlName?: string,
  ): { controlName: string; error: ValidationErrors }[] {
    const errors: { controlName: string; error: ValidationErrors }[] = [];
    for (const controlName of Object.keys(controls)) {
      const control = (controls as never)[controlName];
      const error = this.formControlErrors(control, controls);
      if (error) {
        errors.push({
          controlName: parentControlName
            ? `${parentControlName}.${controlName}`
            : controlName,
          error,
        });
      }
      if ((control as FormArray)?.controls) {
        errors.push(
          ...this.getFormErrors(
            (control as FormArray).controls,
            parentControlName
              ? `${parentControlName}.${controlName}`
              : controlName,
          ),
        );
      }
    }
    return errors;
  }

  public abstract initForm(): void;
  public abstract save(): void;
}
