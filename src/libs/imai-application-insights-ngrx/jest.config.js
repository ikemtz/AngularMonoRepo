module.exports = {
  name: 'imai-application-insights-ngrx',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/imai-application-insights-ngrx',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
