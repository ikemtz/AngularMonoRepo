import { PermissionsGuard } from '@imao/auth0-oidc';

export class EmployeeRouteGuard extends PermissionsGuard {
  protected permissions: string[] = ['test']
}