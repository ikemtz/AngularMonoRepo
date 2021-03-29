import { normalizeRequest } from './normalize-request';

describe('NormalizeRequest', () => {

  it('should remove empty strings properly', () => {
    expect(normalizeRequest({ id: '598425a4-e5ed-4b8a-8911-0845e661fbea', name: '' }))
      .toStrictEqual({ id: '598425a4-e5ed-4b8a-8911-0845e661fbea', name: null });
  });
  it('should not remove other data types', () => {
    expect(normalizeRequest({
      id: '598425a4-e5ed-4b8a-8911-0845e661fbea',
      name: '',
      number: 1,
      number2: 0
    }))
      .toStrictEqual({
        id: '598425a4-e5ed-4b8a-8911-0845e661fbea',
        name: null,
        number: 1,
        number2: 0,
      });
  });
});
