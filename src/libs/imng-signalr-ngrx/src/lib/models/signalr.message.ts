export interface ISignalrMessage<T = unknown> {
    methodName: string;
    data: T;
}
