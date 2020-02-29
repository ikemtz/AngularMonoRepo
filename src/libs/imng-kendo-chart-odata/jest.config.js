module.exports = {
  name: 'imng-kendo-chart-odata',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/imng-kendo-chart-odata',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
