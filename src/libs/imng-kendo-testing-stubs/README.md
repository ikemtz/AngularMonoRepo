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

| HTML selector               | Stub component                                                                                           |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| `button[kendoButton]`       | [IMNG_KENDO_BUTTON_STUB](./src/lib/components/kendo-button-stub.component.ts)                            |
| `kendo-button-group`        | [IMNG_KENDO_BUTTON_GROUP_STUB](./src/lib/components/kendo-button-group-stub.component.ts)                |
| `kendo-chart`               | [IMNG_KENDO_CHART_STUB](./src/lib/components/kendo-chart-stub.component.ts)                              |
| `kendo-chart-legend`        | [IMNG_KENDO_CHART_LEGEND_STUB](./src/lib/components/kendo-chart-legend-stub.component.ts)                |
| `kendo-chart-series`        | [IMNG_KENDO_CHART_SERIES_STUB](./src/lib/components/kendo-chart-series-stub.component.ts)                |
| `kendo-chart-series-item`   | [IMNG_KENDO_CHART_SERIES_ITEM_STUB](./src/lib/components/kendo-chart-series-item-stub.component.ts)      |
| `kendo-chart-title`         | [IMNG_KENDO_CHART_TITLE_STUB](./src/lib/components/kendo-chart-title-stub.component.ts)                  |
| `kendo-combobox`            | [IMNG_KENDO_COMBOBOX_STUB](./src/lib/components/kendo-combobox-stub.component.ts)                        |
| `kendo-combobox-column`     | [IMNG_KENDO_COMBOBOX_COLUMN_STUB](./src/lib/components/kendo-combobox-column-stub.component.ts)          |
| `kendo-datepicker`          | [IMNG_KENDO_DATEPICKER_STUB](./src/lib/components/kendo-datepicker-stub.component.ts)                    |
| `kendo-dialog`              | [IMNG_KENDO_DIALOG_STUB](./src/lib/components/kendo-dialog-stub.component.ts)                            |
| `kendo-dialog-actions`      | [IMNG_KENDO_DIALOG_ACTIONS_STUB](./src/lib/components/kendo-dialog-actions-stub.component.ts)            |
| `kendo-dialog-titlebar`     | [IMNG_KENDO_DIALOG_TITLEBAR_STUB](./src/lib/components/kendo-dialog-titlebar-stub.component.ts)          |
| `kendo-dropdownbutton`      | [IMNG_KENDO_DROPDOWNBUTTON_STUB](./src/lib/components/kendo-dropdownbutton-stub.component.ts)            |
| `kendo-dropdownlist`        | [IMNG_KENDO_DROPDOWNLIST_STUB](./src/lib/components/kendo-dropdownlist-stub.component.ts)                |
| `kendo-grid`                | [IMNG_KENDO_GRID_STUB](./src/lib/components/kendo-grid-stub.component.ts)                                |
| `kendo-grid-column`         | [IMNG_KENDO_GRID_COLUMN_STUB](./src/lib/components/kendo-grid-column-stub.component.ts)                  |
| `kendo-grid-column-chooser` | [IMNG_KENDO_GRID_COLUMN_CHOOSER_STUB](./src/lib/components/kendo-grid-column-chooser-stub.component.ts)  |
| `kendo-grid-command-column` | [IMNG_KENDO_GRID_COMMAND_COLUMN_STUB](./src/lib/components/kendo-grid-command-column-stub.components.ts) |
| `kendo-grid-column-group`   | [IMNG_KENDO_GRID_COLUMN_GROUP_STUB](./src/lib/components/kendo-grid-column-group-stub.component.ts)      |
| `kendo-grid-excel`          | [IMNG_KENDO_GRID_EXCEL_STUB](./src/lib/components/kendo-grid-excel-stub.component.ts)                    |
| `kendo-grid-messages`       | [IMNG_KENDO_GRID_MESSAGES_STUB](./src/lib/components/kendo-grid-messages-stub.component.ts)              |
| `kendo-grid-pdf`            | [IMNG_KENDO_GRID_PDF_STUB](./src/lib/components/kendo-grid-pdf-stub.component.ts)                        |
| `kendo-grid-pdf-margin`     | [IMNG_KENDO_GRID_PDF_MARGIN_STUB](./src/lib/components/kendo-grid-pdf-margin-stub.component.ts)          |
| `kendo-menu`                | [IMNG_KENDO_MENU_STUB](./src/lib/components/kendo-menu-stub.component.ts)                                |
| `kendo-menu-item`           | [IMNG_KENDO_MENU_ITEM_STUB](./src/lib/components/kendo-menu-item-stub.component.ts)                      |
| `kendo-multicolumncombobox` | [IMNG_KENDO_MULTICOLUMNCOMBOBOX_STUB](./src/lib/components/kendo-multicolumncombobox-stub.component.ts)  |
| `kendo-panelbar`            | [IMNG_KENDO_PANELBAR_STUB](./src/lib/components/kendo-panelbar-stub.component.ts)                        |
| `kendo-panelbar-item`       | [IMNG_KENDO_PANELBAR_ITEM_STUB](./src/lib/components/kendo-panelbar-item-stub.component.ts)              |
| `kendo-popup`               | [IMNG_KENDO_POPUP_STUB](./src/lib/components/kendo-popup-stub.component.ts)                              |
| `kendo-progressbar`         | [IMNG_KENDO_PROGRESSBAR_STUB](./src/lib/components/kendo-progress-bar-stub.component.ts)                 |
| `kendo-splitbutton`         | [IMNG_KENDO_SPLIT_BUTTON_STUB](./src/lib/components/kendo-split-button-stub.component.ts)                |
| `kendo-splitter`            | [IMNG_KENDO_SPLITTER_STUB](./src/lib/components/kendo-splitter-stub.component.ts)                        |
| `kendo-splitter-pane`       | [IMNG_KENDO_SPLITTER_PANE_STUB](./src/lib/components/kendo-splitter-pane-stub.component.ts)              |
| `kendo-svg-icon`            | [IMNG_SVG_ICON_STUB](./src/lib/components/kendo-svg-icon-stub.component.ts)                              |
| `kendo-textarea`            | [IMNG_KENDO_TEXTAREA_STUB](./src/lib/components/kendo-textarea-stub.component.ts)                        |
| `kendo-textarea-prefix`     | [IMNG_KENDO_TEXTAREA_PREFIX_STUB](./src/lib/components/kendo-textarea-prefix-stub.component.ts)          |
| `kendo-textarea-suffix`     | [IMNG_KENDO_TEXTAREA_SUFFIX_STUB](./src/lib/components/kendo-textarea-suffix-stub.component.ts)          |
| `kendo-textbox`             | [IMNG_KENDO_TEXTBOX_STUB](./src/lib/components/kendo-textbox-stub.component.ts)                          |
| `kendo-tabstrip`            | [IMNG_KENDO_TABSTRIP_STUB](./src/lib/components/kendo-tabstrip-stub.component.ts)                        |
| `kendo-tabstrip-tab`        | [IMNG_KENDO_TABSTRIP_TAB_STUB](./src/lib/components/kendo-tabstrip-tab-stub.component.ts)                |
