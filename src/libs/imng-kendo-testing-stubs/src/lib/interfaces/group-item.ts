import { GroupResult } from './group-result';

export interface GroupItem {
  type: 'group';
  data: GroupResult;
  index: string;
  level: number;
  parentGroup: GroupItem;
}
