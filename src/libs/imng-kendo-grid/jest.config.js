module.exports = {
  name: 'imng-kendo-grid',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/imng-kendo-grid',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
