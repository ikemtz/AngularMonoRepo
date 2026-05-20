export interface NavigationCell { 
    uid: number; 
    column: unknown; 
    colIndex: number; 
    rowIndex: number; 
    colSpan?: number; 
    rowSpan?: number; 
    dataRowIndex: number; 
    dataItem: unknown; 
    parent?: NavigationCell; 
    focusGroup?: unknown; 
    expandable?: boolean; 
    focusContent(): void;
}
