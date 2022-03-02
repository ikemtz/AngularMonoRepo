import { findUpSync } from "./find-up";

describe(`find-up`, () => {
  test(`should find file`, () => {
    const file = findUpSync('README.md');
    expect(file).toBe('C:\\Repos\\AngularMonoRepo\\schematics\\README.md');
  })
});