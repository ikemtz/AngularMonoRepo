import { InjectionToken } from '@angular/core';

export interface IdleConfig {
  timeoutWarningInMs: number;
  autoLogoutInMs: number;
}
export const IDLE_CONFIG = new InjectionToken<IdleConfig>('idle-config');
