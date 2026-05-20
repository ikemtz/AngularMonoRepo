import { WorkbookSheetRowCellBorder } from "./workbook-sheet-row-cell-border";

export interface CellOptions { 
    background?: string; 
    borderBottom?: WorkbookSheetRowCellBorder; 
    borderLeft?: WorkbookSheetRowCellBorder; 
    borderTop?: WorkbookSheetRowCellBorder; 
    borderRight?: WorkbookSheetRowCellBorder; 
    bold?: boolean; 
    color?: string; 
    fontFamily?: string; 
    fontSize?: number; 
    format?: string; 
    italic?: boolean; 
    textAlign?: 'left' | 'center' | 'right'; 
    underline?: boolean; 
    wrap?: boolean; 
    verticalAlign?: 'top' | 'center' | 'bottom';
}
