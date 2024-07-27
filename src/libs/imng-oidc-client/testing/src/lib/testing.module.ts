import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OidcMockFacade } from './oidc-mock.facade';

@NgModule({
  imports: [CommonModule],
  providers: [OidcMockFacade],
})
export class TestingModule {}
