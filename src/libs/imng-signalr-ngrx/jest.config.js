module.exports = {
  name: 'imng-signalr-ngrx',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/imng-signalr-ngrx',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
