import { Component } from '@angular/core';
import { MetadataOverride } from '@angular/core/testing';
import {
  KENDO_BUTTON,
  KENDO_SPLITBUTTON,
} from '@progress/kendo-angular-buttons';
import { ColumnChooserComponent } from '@progress/kendo-angular-grid';
import { KENDO_SVGICON } from '@progress/kendo-angular-icons';
import { KENDO_POPUP } from '@progress/kendo-angular-popup';
import { KENDO_PROGRESSBAR } from '@progress/kendo-angular-progressbar';
import {
  IMNG_KENDO_BUTTON_STUB,
  IMNG_KENDO_GRID_HEADER_TESTING_STUBS,
} from 'imng-kendo-testing-stubs';

export function getKendoGridODataHeaderOverride(): MetadataOverride<Component> {
  return {
    remove: {
      imports: [
        KENDO_BUTTON,
        KENDO_SPLITBUTTON,
        KENDO_POPUP,
        KENDO_PROGRESSBAR,
        KENDO_SVGICON,
        ColumnChooserComponent,
      ],
    },
    add: {
      imports: [
        ...IMNG_KENDO_GRID_HEADER_TESTING_STUBS,
        IMNG_KENDO_BUTTON_STUB,
      ],
    },
  };
}
