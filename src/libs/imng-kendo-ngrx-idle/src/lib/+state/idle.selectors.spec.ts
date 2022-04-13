import { idleQuery } from './idle.selectors';

describe('Idle Selectors', () => {
  it('should select the feature state', () => {

    expect(idleQuery).toMatchSnapshot();
  });
});
