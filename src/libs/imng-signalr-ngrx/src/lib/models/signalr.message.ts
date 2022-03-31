export interface ISignalrMessage<MESSAGE_TYPE = unknown> {
  //NOSONAR
  methodName: string;
  data: MESSAGE_TYPE;
}
