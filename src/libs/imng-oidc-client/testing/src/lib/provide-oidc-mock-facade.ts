import { OidcFacade } from 'imng-oidc-client';
import { OidcMockFacade } from './oidc-mock.facade';

export function provideOidcMockFacade() {
  return {
    provide: OidcFacade,
    useValue: new OidcMockFacade(),
  };
}
