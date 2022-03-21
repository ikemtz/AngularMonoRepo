import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ImngTypeaheadDirective, ImngMatchSelectedEvent } from 'imng-ngxb-typeahead';

export function triggerTypeaheadOnSelectEvent<TComponent, TEntity>(
  fixture: ComponentFixture<TComponent>,
  eventPayload: TEntity,
): void {
  const typeAhead = fixture.debugElement.query(By.directive(ImngTypeaheadDirective));
  typeAhead.triggerEventHandler('typeaheadOnSelect', {
    item: { item: eventPayload },
  } as ImngMatchSelectedEvent<TEntity>);
}

export function triggerTypeaheadLoadingEvent<TComponent>(fixture: ComponentFixture<TComponent>, eventPayload: boolean): void {
  const typeAhead = fixture.debugElement.query(By.directive(ImngTypeaheadDirective));
  typeAhead.triggerEventHandler('typeaheadLoading', eventPayload);
}
