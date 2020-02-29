module.exports = {
  name: 'imng-ngxb-typeahead',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/imng-ngxb-typeahead',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
