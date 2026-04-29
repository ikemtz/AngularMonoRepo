export function getRelatedField(options: IRelatedFieldOptions): string {
  return options.segments.join(options.separator || '/');
}
export interface IRelatedFieldOptions {
  separator?: string;
  segments: string[];
}

export function isRelatedFieldOptions(
  source: string | IRelatedFieldOptions,
): source is IRelatedFieldOptions {
  return !!(source as IRelatedFieldOptions).segments;
}
