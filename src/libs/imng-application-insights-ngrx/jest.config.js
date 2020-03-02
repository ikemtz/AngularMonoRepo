module.exports = {
  name: 'imng-application-insights-ngrx',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/imng-application-insights-ngrx',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
