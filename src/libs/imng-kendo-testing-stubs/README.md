# IMNG Kendo Testing Stubs

Standalone stub components for Kendo UI Angular components to speed up unit tests.

## Typical Usage

Here's an example of these stubs used in the setup of an Angular Testbed

```typescript
  TestBed.configureTestingModule({
    imports: [CustomerListComponent],
    providers: [...],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  })
  .overrideComponent(CustomerListComponent, {
    remove: {
      imports: [KENDO_GRID], // The actual Angular Kendo Grid
    },
    add: {
      imports: [...IMNG_KENDO_GRID_TESTING_STUBS], // A lightweight stub replacement
      providers: [{ provide: GridComponent, useClass: IMNG_KENDO_GRID_STUB }],
    },
  })
  .compileComponents();
```

## Selectors and components

| HTML selector               | Stub component                                                                                  |
| --------------------------- | ----------------------------------------------------------------------------------------------- |
| `kendo-grid`                | [IMNG_KENDO_GRID_STUB](./src/lib/kendo-grid-stub.component.ts)                                  |
| `kendo-grid-column`         | [IMNG_KENDO_GRID_COLUMN_STUB](./src/lib/kendo-grid-column-stub.component.ts)                    |
| `kendo-grid-column-chooser` | [IMNG_KENDO_GRID_COLUMN_CHOOSER_STUB](./src/lib/kendo-grid-column-chooser-stub.component.ts)    |
| `kendo-grid-excel`          | [IMNG_KENDO_GRID_EXCEL_STUB](./src/lib/kendo-grid-excel-stub.component.ts)                      |
| `kendo-grid-pdf`            | [IMNG_KENDO_GRID_PDF_STUB](./src/lib/kendo-grid-pdf-stub.component.ts)                          |
| `kendo-grid-pdf-margin`     | [IMNG_KENDO_GRID_PDF_MARGIN_STUB](./src/lib/kendo-grid-pdf-margin-stub.component.ts)            |
| `kendo-menu`                | [IMNG_KENDO_MENU_STUB](./src/lib/kendo-menu-stub.component.ts)                                  |
| `kendo-popup`               | [IMNG_KENDO_POPUP_STUB](./src/lib/kendo-popup-stub.component.ts)                                |
| `kendo-progressbar`         | [IMNG_KENDO_PROGRESSBAR_STUB](./src/lib/kendo-progress-bar-stub.component.ts)                   |
| `kendo-splitbutton`         | [IMNG_KENDO_SPLIT_BUTTON_STUB](./src/lib/kendo-split-button-stub.component.ts)                  |
| `kendo-datepicker`          | [IMNG_KENDO_DATEPICKER_STUB](./src/lib/kendo-datepicker-stub.component.ts)                      |
| `kendo-multicolumncombobox` | [IMNG_KENDO_MULTICOLUMNCOMBOBOX_STUB](./src/lib/kendo-multicolumncombobox-stub.component.ts.ts) |
| `kendo-combobox-column`     | [IMNG_KENDO_COMBOBOX_COLUMN_STUB](./src/lib/kendo-combobox-column-stub.component.ts)            |
