module.exports = {
  name: 'nurser-ui',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/nurser-ui',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
