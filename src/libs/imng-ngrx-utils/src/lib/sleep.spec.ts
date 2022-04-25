import { sleep } from './sleep';

describe('sleep', () => {
  it('should work', async () => {
    expect(sleep(1000)).toBeTruthy();
    expect(await sleep(1000)).toBeUndefined();
  });
});
