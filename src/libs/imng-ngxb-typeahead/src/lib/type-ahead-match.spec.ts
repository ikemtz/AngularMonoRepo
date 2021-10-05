import { ImngTypeaheadMatch } from './type-ahead-match';

describe('ImngTypeaheadMatch', () => {
  it('should create an instance', () => {
    const typeAheadMatch = new ImngTypeaheadMatch<testObject>({ id: '💩🩲' }, '💩');
    expect(typeAheadMatch).toBeTruthy();
    expect(typeAheadMatch.toString()).toBe('💩');
    expect(typeAheadMatch.isHeader()).toBe(false);
  });
});

export interface testObject {
  id: string;
}
