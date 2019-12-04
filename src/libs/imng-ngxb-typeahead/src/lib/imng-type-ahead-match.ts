export class ImngTypeaheadMatch<T> {
  constructor(public readonly item: T, public readonly value: string, public readonly header = false) {
  }
  isHeader(): boolean {
    return this.header;
  }
  toString(): string {
    return this.value;
  }
}

export class ImngMatchSelectedEvent<T> {
  constructor(public readonly item: ImngTypeaheadMatch<T>, public readonly value?: string, public readonly header = false) {
    value = value || item.value;
  } 
  isHeader(): boolean {
    return this.header;
  }
  toString(): string {
    return this.value;
  }
}
