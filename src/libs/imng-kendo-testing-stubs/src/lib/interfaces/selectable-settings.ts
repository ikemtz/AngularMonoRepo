export interface SelectableSettings { 
    mode?: 'cell' | 'row'; 
    multiple?: boolean; 
    drag?: boolean | {
        snap: boolean;
    }; 
    enabled?: boolean; 
    checkboxOnly?: boolean; 
    readonly?: boolean;
}