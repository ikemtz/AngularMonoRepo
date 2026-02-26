import { Component } from '@angular/core';
import { MetadataOverride } from '@angular/core/testing';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
import { KENDO_DIALOG } from '@progress/kendo-angular-dialog';
import {
  IMNG_KENDO_BUTTON_STUB,
  IMNG_KENDO_DIALOG_STUBS,
} from 'imng-kendo-testing-stubs';

export function getImngKendoDataEntryDialogOverride(): MetadataOverride<Component> {
  return {
    remove: { imports: [KENDO_DIALOG, KENDO_BUTTON] },
    add: { imports: [...IMNG_KENDO_DIALOG_STUBS, IMNG_KENDO_BUTTON_STUB] },
  };
}
