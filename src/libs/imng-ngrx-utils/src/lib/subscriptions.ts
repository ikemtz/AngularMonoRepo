import { Subscription } from 'rxjs';

export class Subscriptions {
  private static _instance: Subscriptions;
  private readonly _subscriptions: Subscription[];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {
    this._subscriptions = [];
  }

  public static get instance(): Subscriptions {
    if (!Subscriptions._instance) {
      Subscriptions._instance = new Subscriptions();
    }
    return Subscriptions._instance;
  }
  public get length(): number {
    return this._subscriptions.length;
  }

  public push(...items: Subscription[]): void {
    this._subscriptions.push(...items);
  }
  public forEach(
    callbackfn: (value: Subscription, index: number, array: Subscription[]) => void,
    thisArg?: unknown,
  ): void {
    this._subscriptions.forEach(callbackfn, thisArg);
  }

  public unsubscribeAll(): void {
    while (this._subscriptions.length > 0) {
      const val = this._subscriptions.pop();
      val?.unsubscribe();
    }
  }
}
