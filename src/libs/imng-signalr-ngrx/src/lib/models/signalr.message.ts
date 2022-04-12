export interface ISignalrMessage<MESSAGE_TYPE = unknown> {
  methodName: string;
  data: MESSAGE_TYPE;
}
