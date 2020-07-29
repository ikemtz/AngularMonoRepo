module.exports = {
  name: 'imng-inventory',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/imng-inventory',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
