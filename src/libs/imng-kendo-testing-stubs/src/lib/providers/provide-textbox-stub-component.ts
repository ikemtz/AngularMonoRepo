import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { IMNG_KENDO_TEXTBOX_STUB } from '../components/kendo-textbox-stub.component';

export function provideTextboxStubComponent() {
  return { provide: TextBoxComponent, useClass: IMNG_KENDO_TEXTBOX_STUB };
}
