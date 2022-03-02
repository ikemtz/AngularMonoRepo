import { findUpSync } from "./find-up";

describe(`find-up`, () => {
  test(`should find file`, () => {
    const file = findUpSync('.gitignore');
    expect(file).toBe('C:\\Repos\\AngularMonoRepo\\schematics\\.gitignore');
  })
});