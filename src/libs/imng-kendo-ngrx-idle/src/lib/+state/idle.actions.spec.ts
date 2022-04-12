import * as fromIdle from './idle.actions';

describe('loadIdles', () => {
  it('should return an action', () => {
    expect(fromIdle.onSessionExtended().type).toBe('[Idle] Session Extended');
  });
});
