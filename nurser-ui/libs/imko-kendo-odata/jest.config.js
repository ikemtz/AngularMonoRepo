module.exports = {
  name: 'imko-kendo-odata',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/imko-kendo-odata',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
