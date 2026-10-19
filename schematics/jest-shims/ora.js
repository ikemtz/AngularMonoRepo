function ora() {
  return {
    start() {
      return this;
    },
    succeed() {
      return this;
    },
    fail() {
      return this;
    },
    stop() {
      return this;
    },
  };
}

module.exports = ora;
module.exports.default = ora;
