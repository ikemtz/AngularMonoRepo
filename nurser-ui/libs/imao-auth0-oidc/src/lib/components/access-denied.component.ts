import { Component } from '@angular/core';
import { AccessDeniedRouteUrl } from '../services/permission-guard';

@Component({
  selector: 'imao-access-denied',
  template: '<div class="p-5 m-5">Access denied.</div>'
})
export class AccessDeniedComponent { }

export const AccessDeniedRoute = { path: AccessDeniedRouteUrl, component: AccessDeniedComponent };