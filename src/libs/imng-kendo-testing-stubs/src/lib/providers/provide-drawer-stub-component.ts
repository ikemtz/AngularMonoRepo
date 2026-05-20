import { DrawerComponent } from '@progress/kendo-angular-layout';
import { IMNG_KENDO_DRAWER_STUB } from '../components/kendo-drawer-stub.component';

export function provideDrawerStubComponent() {
  return { provide: DrawerComponent, useClass: IMNG_KENDO_DRAWER_STUB };
}
