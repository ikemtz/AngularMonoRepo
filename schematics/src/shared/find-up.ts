import { dirname, parse, resolve } from "path";
import { lstatSync } from "fs";

export function findUpSync(name: string): string | undefined {
  let directory = __dirname;
  const { root } = parse(directory);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const foundPath = locatePathSync(name, directory);
    if (foundPath) {
      return resolve(directory, foundPath);
    }
    else if (directory === root) {
      break;
    } else {
      directory = dirname(directory);
    }
  }
}

export function locatePathSync(
  file: string,
  directory: string
): string | undefined {
  try {
    const stat = lstatSync(resolve(directory, file));

    if (stat['isFile']) {
      return file;
    }
    // eslint-disable-next-line no-empty
  } catch { }
}