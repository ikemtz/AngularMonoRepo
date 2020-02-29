module.exports = {
  name: 'imko-kendo-odata',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/imko-kendo-odata',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
