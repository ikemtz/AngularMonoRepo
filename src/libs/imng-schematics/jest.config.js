module.exports = {
  name: 'imng-schematics',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/imng-schematics',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
