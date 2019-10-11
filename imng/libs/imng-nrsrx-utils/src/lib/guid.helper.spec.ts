import { GuidHelper } from './guid.helper';

describe('GuidHelper', () => {

  it('should minimize properly', () => { 
    expect(GuidHelper.minimize('598425a4-e5ed-4b8a-8911-0845e661fbea')).toBe('598425a4e5ed4b8a89110845e661fbea')
  });
});
