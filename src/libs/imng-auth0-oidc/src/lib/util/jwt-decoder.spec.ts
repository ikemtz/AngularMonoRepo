import { jwtDecoder } from './jwt-decoder';

describe('jwtDecoder', () => {
  it('should return null if provided null', () => {
    const result = jwtDecoder(null);
    expect(result).toBeFalsy();
  });
});
