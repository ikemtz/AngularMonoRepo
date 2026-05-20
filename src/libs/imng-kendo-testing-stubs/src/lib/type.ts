import { CellSelectionItem } from './interfaces/cell-selection-item';
import { DataItem } from './interfaces/data-item';
import { GroupFooterItem } from './interfaces/group-footer-item';
import { GroupItem } from './interfaces/group-item';
import { RowArgs } from './interfaces/row-args';

export type CssClassType =
  | undefined
  | string
  | string[]
  | Set<string>
  | { [key: string]: never };

export type StyleType = undefined | { [key: string]: string };
export type FilterVariant = 'default' | 'multiCheckbox';
export type FieldDataType = 'text' | 'numeric' | 'date' | 'boolean';
export type InputAttributesType = { [key: string]: string };
export type ItemDisabledFn = () => boolean;
export type PagerType = 'numeric' | 'input';
export type RowClassFn = (param: { dataItem: unknown; index: number }) => {
  even: boolean;
  odd: boolean;
};
export type ScrollMode = 'none' | 'scrollable' | 'virtual';
export type ColumnSortSettings =
  | boolean
  | {
      allowUnsort?: boolean;
      initialDirection?: 'asc' | 'desc';
    };
export type SortSettings =
  | boolean
  | (ColumnSortSettings & {
      mode?: 'single' | 'multiple';
      showIndexes?: boolean;
    });
export type PaperSize =
  | string
  | [number | string, number | string]
  | 'auto'
  | 'A0'
  | 'A1'
  | 'A2'
  | 'A3'
  | 'A4'
  | 'A5'
  | 'A6'
  | 'A7'
  | 'A8'
  | 'A9'
  | 'A10'
  | 'B0'
  | 'B1'
  | 'B2'
  | 'B3'
  | 'B4'
  | 'B5'
  | 'B6'
  | 'B7'
  | 'B8'
  | 'B9'
  | 'B10'
  | 'C0'
  | 'C1'
  | 'C2'
  | 'C3'
  | 'C4'
  | 'C5'
  | 'C6'
  | 'C7'
  | 'C8'
  | 'C9'
  | 'C10'
  | 'Executive'
  | 'Folio'
  | 'Legal'
  | 'Letter'
  | 'Tabloid'; //NOSONAR
export type CellBorderSize = 1 | 2 | 3;

export type AnimationType = 'slide' | 'expand' | 'zoom' | 'fade';
export type AnimationDirection = 'down' | 'up' | 'left' | 'right';
export type CollisionType = 'fit' | 'flip';
export type HorizontalPoint = 'left' | 'center' | 'right';
export type VerticalPoint = 'top' | 'center' | 'bottom';
export type MenuSize = 'small' | 'medium' | 'large' | 'none';
export type AdaptiveMode = 'none' | 'auto';
export type CellSelectedFn = (
  row: RowArgs,
  column: unknown,
  colIndex: number,
) => {
  selected: boolean;
  item: CellSelectionItem;
};
export type RowSelectableFn = (context: RowArgs) => boolean;
export type DataLayoutMode = 'columns' | 'stacked';
export type RowSelectedFn = (context: RowArgs) => boolean;
export type RowStickyFn = (context: RowArgs) => boolean;
export type GridSize = 'small' | 'medium' | 'none';
export type GridItem = DataItem | GroupItem | GroupFooterItem;
