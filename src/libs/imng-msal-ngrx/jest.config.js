module.exports = {
  name: 'imng-msal-ngrx',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/imng-msal-ngrx',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
