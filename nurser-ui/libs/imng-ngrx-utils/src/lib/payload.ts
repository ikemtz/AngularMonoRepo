export class Payload<T>{
  payload: T;
}

export function createPayload<T>(payload: T) : Payload<T> {
  return { payload };
}