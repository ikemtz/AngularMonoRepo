import { ImngMatchSelectedEvent } from './match-selected-event';
import { ImngTypeaheadMatch } from './type-ahead-match';
import { testObject } from './type-ahead-match.spec';

describe('ImngMatchSelectedEvent', () => {
  it('should create an instance', () => {
    const selectedEvent = new ImngMatchSelectedEvent<testObject>(
      new ImngTypeaheadMatch<testObject>({ id: '💩🩲' }, '💩💩'),
      '💩',
    );
    expect(selectedEvent).toBeTruthy();
    expect(selectedEvent.toString()).toBe('💩');
    expect(selectedEvent.isHeader()).toBe(false);
  });
});
