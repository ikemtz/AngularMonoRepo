import { OnDestroy } from '@angular/core';
import { Subscriptions } from './subscriptions';

export interface Subscribable extends OnDestroy {
  allSubscriptions: Subscriptions;
}
