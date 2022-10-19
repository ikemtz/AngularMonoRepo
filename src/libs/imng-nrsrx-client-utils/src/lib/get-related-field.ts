export function getRelatedField(options: IRelatedFieldOptions): string {
  return options.segments.join(options.seperator || '/');
}
export interface IRelatedFieldOptions {
  seperator?: string;
  segments: string[];
}

export function isRelatedFieldOptions(
  source: string | IRelatedFieldOptions,
): source is IRelatedFieldOptions {
  return !!(source as IRelatedFieldOptions).segments;
}
