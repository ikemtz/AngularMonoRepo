import './date.extensions';
import { DateHelper } from './date.helper';

describe('toShortDateString', () => {
  it('to handle 1/1/2020', () => {
    const dt = new Date('1/1/2020');
    expect(DateHelper.toShortDateString(dt)).toBe('01/01/2020');
  });
});


describe('weekOfYear', () => {
  it('to handle 1/1/2020', () => {
    const dt = new Date('1/1/2020');
    expect(DateHelper.weekOfYear(dt)).toBe(1);
  });
  it('to handle 12/31/2020', () => {
    const dt = new Date('12/31/2020');
    expect(DateHelper.weekOfYear(dt)).toBe(53);
  });
  it('to handle 12/29/2018', () => {
    const dt = new Date('12/29/2018');
    expect(DateHelper.weekOfYear(dt)).toBe(52);
  });
});
