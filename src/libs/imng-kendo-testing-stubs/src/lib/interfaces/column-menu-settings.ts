import { ExpandableColumnMenuItem } from "./expandable-column-menu-item";

export interface ColumnMenuSettings { 
    view?: 'list' | 'tabbed'; 
    sort?: boolean; 
    filter?: boolean | ExpandableColumnMenuItem; 
    columnChooser?: boolean | ExpandableColumnMenuItem; 
    lock?: boolean; 
    stick?: boolean; 
    setColumnPosition?: boolean | ExpandableColumnMenuItem; 
    autoSizeColumn?: boolean; 
    autoSizeAllColumns?: boolean;
}