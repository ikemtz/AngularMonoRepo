import { AlignStrategy } from "./align-strategy";

export interface Align extends AlignStrategy { 
    horizontal: 'left' | 'center' | 'right'; 
    vertical: 'top' | 'center' | 'bottom';
}
