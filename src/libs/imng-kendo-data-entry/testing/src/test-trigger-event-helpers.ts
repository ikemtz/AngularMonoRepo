import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export function triggerSaveClickEvent<TComponent>(fixture: ComponentFixture<TComponent>) {
  const typeAhead = fixture.debugElement.query(By.css('#btnSave'));
  typeAhead.triggerEventHandler('click', {});
}
export function triggerCancelClickEvent<TComponent>(fixture: ComponentFixture<TComponent>) {
  const typeAhead = fixture.debugElement.query(By.css('#btnCancel'));
  typeAhead.triggerEventHandler('click', {});
}
