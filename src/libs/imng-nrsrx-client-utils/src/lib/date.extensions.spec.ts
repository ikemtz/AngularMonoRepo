import './date.extensions';
import { toLocalTimeStamp, toShortDateString, weekOfYear } from './date.extensions';

describe('toLocalTimeStamp', () => {
  it('to handle 1/1/2020', () => {
    const dt = new Date('1/1/2020');
    expect(toLocalTimeStamp(dt)).toBe('20200101000000-000');
  });
  it('to handle current DateTime', () => {
    const timeStamp = toLocalTimeStamp();
    expect(timeStamp.length).toBe(18);
    expect(timeStamp[14]).toBe('-');
    expect(timeStamp[0]).toBe('2');
  });
});

describe('toShortDateString', () => {
  it('to handle 1/1/2020', () => {
    const dt = new Date('1/1/2020');
    expect(toShortDateString(dt)).toBe('01/01/2020');
  });
  it('to handle undefined', () => {
    expect(toShortDateString(undefined as unknown as Date)).toBe(undefined);
  });
});

describe('weekOfYear', () => {
  it('to handle 1/1/2020', () => {
    const dt = new Date('1/1/2020');
    expect(weekOfYear(dt)).toBe(1);
  });
  it('to handle 12/31/2020', () => {
    const dt = new Date('12/31/2020');
    expect(weekOfYear(dt)).toBe(53);
  });
  it('to handle 12/29/2018', () => {
    const dt = new Date('12/29/2018');
    expect(weekOfYear(dt)).toBe(52);
  });
});
