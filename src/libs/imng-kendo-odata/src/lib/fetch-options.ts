export interface FetchOptions {
  boundChildTableProperties?: string[];
  /**
   * Collection of property names that are of type: nullable Date
   */
  dateNullableProps?: string[];
  /**
   * Collection of property names that are of type: nullable DateTime
   *    Note: these properties will be converted to local date time
   */
  utcNullableProps?: string[];
  /**
   * Set to true to force request via cache-busting.
   * Default: false;
   */
  bustCache?: boolean;
}
