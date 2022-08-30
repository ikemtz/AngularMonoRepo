export interface FetchOptions {
  /**
   * Collection of child table properties that are rendered on a grid
   */
  boundChildTableProperties?: BoundChildTableProperty[];
  /**
   * Collection of property names that are of type: nullable Date
   */
  dateNullableProps?: string[];
  /**
   * Collection of property names that are of type: nullable UTC DateTime
   *    Note: these properties will be converted to local date time
   */
  utcNullableProps?: string[];
  /**
   * Set to true to force request via cache-busting.
   * Default: false;
   */
  bustCache?: boolean;
}

export interface BoundChildTableProperty {
  /**
   * This is the child table name
   */
  table: string;
  /**
   * This is the field name on the child table that is bound
   */
  field: string;
  /**
   * This controls if 'all' child records have to meet the the conditions
   * or if 'any' of the child records have to meet the condition.
   * Default: 'any'
   */
  linqOperation?: 'all' | 'any';
}
