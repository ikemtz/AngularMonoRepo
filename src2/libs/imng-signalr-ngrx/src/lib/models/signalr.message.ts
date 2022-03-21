// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ISignalrMessage<MESSAGE_TYPE = any> { //NOSONAR
    methodName: string;
    data: MESSAGE_TYPE;
}
