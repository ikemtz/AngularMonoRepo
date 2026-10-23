import { GroupItem } from './group-item';
import { GroupResult } from './group-result';

export interface GroupFooterItem {
  type: 'footer';
  data: GroupResult;
  groupIndex: string;
  level: number;
  group: GroupItem;
}
