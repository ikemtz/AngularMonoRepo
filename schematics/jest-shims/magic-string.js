class MagicString {
  constructor(text) {
    this.original = text;
    this._content = text;
  }

  appendLeft(index, content) {
    this._content = `${this._content.slice(0, index)}${content}${this._content.slice(index)}`;
    return this;
  }

  appendRight(index, content) {
    this._content = `${this._content.slice(0, index + 1)}${content}${this._content.slice(index + 1)}`;
    return this;
  }

  prependLeft(index, content) {
    return this.appendLeft(index, content);
  }

  prependRight(index, content) {
    return this.appendRight(index, content);
  }

  remove(start, end) {
    this._content = `${this._content.slice(0, start)}${this._content.slice(end)}`;
    return this;
  }

  overwrite(start, end, content) {
    this._content = `${this._content.slice(0, start)}${content}${this._content.slice(end)}`;
    return this;
  }

  toString() {
    return this._content;
  }
}

module.exports = {
  MagicString,
};
