module.exports = {
  name: 'imng-kendo-data-entry',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/imng-kendo-data-entry',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
