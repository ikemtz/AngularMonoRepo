import { InjectionToken } from '@angular/core';

export const SIGNALR_CONFIG = new InjectionToken('signalr-config');

export interface ISignalrConfiguration {
    hostUrl: string;
    logLevel: number;
    clientMethods: string[];
}
