module.exports = {
  name: 'imng-az-func-configr',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/imng-az-func-configr',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
