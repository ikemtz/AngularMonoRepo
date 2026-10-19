import { PagerType } from "../type";

export interface PagerSettings { 
    buttonCount?: number; 
    countChildren?: boolean; 
    info?: boolean; 
    type?: PagerType; 
    pageSizes?: boolean | Array<number>; 
    previousNext?: boolean; 
    responsive?: boolean;
}