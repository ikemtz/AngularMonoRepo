module.exports = {
  name: 'imng-kendo-grid-odata',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/imng-kendo-grid-odata',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
