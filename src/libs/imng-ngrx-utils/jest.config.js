module.exports = {
  name: 'imng-ngrx-utils',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/imng-ngrx-utils',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
