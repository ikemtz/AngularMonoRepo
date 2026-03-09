export type CssClassType =
  | undefined
  | string
  | string[]
  | Set<string>
  | { [key: string]: never };

export type StyleType = undefined | { [key: string]: string };
export type FilterVariant = 'default' | 'multiCheckbox';
export type FieldDataType = 'text' | 'numeric' | 'date' | 'boolean';
export type InputAttributesValue = { [key: string]: string };
export type ItemDisabledFn = () => boolean;
