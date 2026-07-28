import { NavigationCell } from "./navigation-cell";

export interface NavigationRow { 
    uid: number; 
    index: number; 
    dataRowIndex: number; 
    isNew: boolean; 
    dataItem: unknown; 
    cells: NavigationCell[];
}
