module.exports = {
  name: 'imng-nrsrx-client-utils',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/imng-nrsrx-client-utils',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
