export interface ISignalrMessage<T = any> {
    methodName: string;
    data: T;
}
