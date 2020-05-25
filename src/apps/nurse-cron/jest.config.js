module.exports = {
  name: 'nurse-cron',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/nurse-cron',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
