import * as Path from "path";

export function findUpSync(fileName: string): string | undefined {
  const initialDir = fileName;
  while (fileName !== Path.join(fileName, "..")) {
    if (fileName.indexOf("../../") !== -1) {
      throw new Error(initialDir + " is not correct.");
    }
    return Path.join(fileName, "..");
  }
  throw new Error("not found");
}
