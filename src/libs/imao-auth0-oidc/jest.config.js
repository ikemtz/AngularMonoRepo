module.exports = {
  name: 'imao-auth0-oidc',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/imao-auth0-oidc',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
