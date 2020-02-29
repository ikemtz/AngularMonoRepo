module.exports = {
  name: 'imng-snippets',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/imng-snippets',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
