import { OnDestroy, Input } from '@angular/core';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { FormGroup, AbstractControl } from '@angular/forms';
import { IDataEntryFacade } from './data-entry-facade';

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
 * @class BaseDataEntryComponent<ENTITY, FACADE extends DataEntryFacade<ENTITY>>
 */

export abstract class BaseDataEntryComponent<ENTITY, FACADE extends IDataEntryFacade<ENTITY>> implements OnDestroy {
  @Input() public width: string;
  @Input() public height: string;
  protected allSubscriptions: Subscription[] = [];
  public abstract dialogTitle: string;
  public abstract props: any;
  public addEditForm: FormGroup;
  public loading$: Observable<boolean>;
  private readonly _submitted$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public get submitted$(): Observable<boolean> {
    return this._submitted$.asObservable();
  }
  // convenience getter for easy access to form fields
  public formControl(controlName: string): AbstractControl {
    return this.addEditForm.controls[controlName];
  }
  public formControlErrors(controlName: string): any {
    return this.addEditForm.controls[controlName].errors;
  }

  constructor(protected facade: FACADE) {
    this.loading$ = this.facade.loading$;
    this.initForm();
  }

  public ngOnDestroy(): void {
    this.allSubscriptions.forEach(val => {
      if (val !== null) val.unsubscribe();
    });
  }

  public closeForm(): void {
    this.initForm();
    this.facade.clearCurrentEntity();
    this._submitted$.next(false);
  }

  public onCancel(): void {
    this.closeForm();
  }

  onSubmit() {
    this._submitted$.next(true);

    // stop here if form is invalid
    if (this.isDataInvalid()) {
      console.log('form validation errors.');
      return;
    }
    this.save();
    this.closeForm();
  }

  protected isDataInvalid(): boolean {
    return this.addEditForm.invalid;
  }

  public abstract initForm(): void;
  public abstract save(): void;
}
