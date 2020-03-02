module.exports = {
  name: 'imng-auth0-oidc',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/imng-auth0-oidc',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
