module.exports = {
  name: 'imng-ngrx-utils',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/imng-ngrx-utils',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
