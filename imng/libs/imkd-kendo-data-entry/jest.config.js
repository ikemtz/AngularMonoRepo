module.exports = {
  name: 'imkd-kendo-data-entry',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/imkd-kendo-data-entry',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
