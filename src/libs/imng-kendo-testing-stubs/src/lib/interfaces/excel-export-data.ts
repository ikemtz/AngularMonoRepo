import { Observable } from "rxjs";

export interface ExcelExportData { 
    data: unknown[] | Observable<unknown[]>; 
    fetchChildren: unknown; 
    hasChildren: unknown;
}
