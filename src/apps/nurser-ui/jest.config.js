module.exports = {
  name: 'nurser-ui',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/nurser-ui',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ]
};
