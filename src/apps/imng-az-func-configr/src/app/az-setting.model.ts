export interface IAzSetting {
  name: string;
  value: string;
  slotSetting: boolean;
}

export interface ILocalSetting {
  [key: string]: string | number | boolean | object;
}
