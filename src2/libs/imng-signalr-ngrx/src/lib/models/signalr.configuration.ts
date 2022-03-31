import { InjectionToken } from '@angular/core';
import {
  HttpTransportType,
  ILogger,
  ITransport,
  LogLevel,
} from '@microsoft/signalr';

export const SIGNALR_CONFIG = new InjectionToken('signalr-config');

export interface ISignalrConfiguration {
  hostUrl: string;
  /** Configures the logger used for logging.
   *
   * Provide an {@link @microsoft/signalr.ILogger} instance, and log messages will be logged via that instance. Alternatively, provide a value from
   * the {@link @microsoft/signalr.LogLevel} enumeration and a default logger which logs to the Console will be configured to log messages of the specified
   * level (or higher).
   */
  logger: ILogger | LogLevel;
  clientMethods: string[];
  /** An {@link @microsoft/signalr.HttpTransportType} value specifying the transport to use for the connection. */
  transport?: HttpTransportType | ITransport;
  /** A boolean indicating if message content should be logged.
   *
   * Message content can contain sensitive user data, so this is disabled by default.
   */
  logMessageContent?: boolean;
  /** A boolean indicating if negotiation should be skipped.
   *
   * Negotiation can only be skipped when the {@link @microsoft/signalr.IHttpConnectionOptions.transport} property is set to 'HttpTransportType.WebSockets'.
   */
  skipNegotiation?: boolean;
  /**
   * Default value is 'true'.
   * This controls whether credentials such as cookies are sent in cross-site requests.
   *
   * Cookies are used by many load-balancers for sticky sessions which is required when your app is deployed with multiple servers.
   */
  withCredentials?: boolean;
}
