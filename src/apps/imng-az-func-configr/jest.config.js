module.exports = {
  name: 'imng-az-func-configr',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/imng-az-func-configr',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
