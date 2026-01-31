import { Component, OnDestroy } from '@angular/core';
import { Subscribable, Subscriptions } from 'imng-ngrx-utils';
import { toLocalTimeStamp, getRelatedValue } from 'imng-nrsrx-client-utils';
import {
  cancelIcon,
  checkIcon,
  editToolsIcon,
  menuIcon,
  trashIcon,
} from '@progress/kendo-svg-icons';
import {
  EnumProperties,
  getEnum,
  getEnumKey,
  getEnumDisplayText,
  IEnumValue,
} from 'openapi-ts-generator/enums';

@Component({
  template: '',
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export abstract class KendoGridBaseComponent<ENTITY>
  implements OnDestroy, Subscribable
{
  public readonly allSubscriptions = new Subscriptions();
  public readonly EnumProperties = EnumProperties;
  public readonly getEnum = getEnum;
  public readonly getEnumDisplayText = getEnumDisplayText;
  public readonly getEnumKey = getEnumKey;
  public readonly getRelatedValue = getRelatedValue;
  public icons = {
    check: checkIcon,
    cancel: cancelIcon,
    edit: editToolsIcon,
    menu: menuIcon,
    trash: trashIcon,
  };

  public getExportFileName(exportName: string): string {
    return `${exportName}-${toLocalTimeStamp()}`;
  }

  public getRelatedField(...segments: string[]): string {
    return segments.join('.');
  }

  public ngOnDestroy(): void {
    this.allSubscriptions.unsubscribeAll();
  }
}
