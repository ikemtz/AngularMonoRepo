import { Subscription } from 'rxjs';

export class Subscriptions {
  private readonly _subscriptions: (Subscription | undefined)[];

  public constructor(...items: Subscription[]) {
    this._subscriptions = items;
  }
  public get length(): number {
    return this._subscriptions.length;
  }

  public push(...items: (Subscription | undefined)[]): void {
    this._subscriptions.push(...items.filter((t) => t));
  }
  public forEach(
    callbackfn: (
      value: Subscription,
      index: number,
      array: Subscription[]
    ) => void,
    thisArg?: unknown
  ): void {
    this._subscriptions
      .map((t) => t as Subscription)
      .forEach(callbackfn, thisArg);
  }

  public unsubscribeAll(): void {
    while (this._subscriptions.length > 0) {
      const val = this._subscriptions.pop();
      val?.unsubscribe();
    }
  }
}
