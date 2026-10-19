import { GroupResult } from '@progress/kendo-data-query';

export interface GroupRowArgs {
  group?: GroupResult;
  groupIndex: string;
  parentGroup?: GroupRowArgs;
}
