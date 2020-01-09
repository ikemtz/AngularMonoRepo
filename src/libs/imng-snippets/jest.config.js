module.exports = {
  name: 'imng-snippets',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/imng-snippets',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
