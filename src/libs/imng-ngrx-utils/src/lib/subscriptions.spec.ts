import { of } from 'rxjs';
import { Subscriptions } from './subscriptions';

describe('Subscription', () => {
  it('should work', () => {

    const sub1 = of('x').subscribe();
    const sub2 = of('x').subscribe();
    const data = new Subscriptions(...[sub1]);
    data.push(...[sub2]);
    expect(data.length).toBe(2);
    data.unsubscribeAll();
    expect(data.length).toBe(0);
    expect(sub1.closed).toBe(true);
    expect(sub2.closed).toBe(true);
  });
});

