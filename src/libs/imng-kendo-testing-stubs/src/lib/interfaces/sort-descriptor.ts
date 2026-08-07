export interface SortDescriptor { 
    field: string; 
    dir?: 'asc' | 'desc'; 
    compare?: (a: unknown, b: unknown) => number;
}