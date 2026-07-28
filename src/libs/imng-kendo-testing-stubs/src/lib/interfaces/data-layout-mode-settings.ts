import { DataLayoutMode } from '../type';
import { GridColSize } from './grid-col-size';

export interface DataLayoutModeSettings {
  mode?: DataLayoutMode;
  stackedCols?: number | Array<number | string | GridColSize>;
}
