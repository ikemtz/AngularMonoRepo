import { ImngTypeaheadDirective } from './type-ahead.directive';

describe('ImngTypeaheadDirective', () => {
  it('should create an instance', () => {
    const provideMock = jest.fn();
    const createLoaderMock = jest.fn(() => ({ provide: provideMock }));
    const directive = new ImngTypeaheadDirective(
      { createLoader: createLoaderMock } as never,
      null as never,
      null as never,
      null as never,
      null as never,
      null as never,
    );
    expect(directive).toBeTruthy();
    expect(provideMock).toHaveBeenCalledTimes(1);
  });
});
