export interface IAzSetting {
  name: string;
  value: string;
  slotSetting: boolean;
}

export interface ILocalSetting {
  IsEncrypted?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Values: any; //NOSONAR
  [key: string]: string | number | boolean | unknown;
}
