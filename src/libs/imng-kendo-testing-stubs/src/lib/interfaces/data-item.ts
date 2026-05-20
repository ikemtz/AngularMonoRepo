import { GroupItem } from './group-item';

export interface DataItem {
  type: 'data';
  data: object;
  index: number;
  groupIndex: string;
  isEditing: boolean;
  group: GroupItem;
}
