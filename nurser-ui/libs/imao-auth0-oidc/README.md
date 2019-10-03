# imng-auth0-oidc

This library was generated with [Nx](https://nx.dev).

To utilize this library you will need to be in an Angular Application running NGRX.

In addition, you'll need to deploy these three files to the root of your site:

- callback.html -> [./src/asets/signout-callback.html](./src/asets/signout-callback.html)
- renew-callback.html -> [./src/asets/signout-callback.html](./src/asets/signout-callback.html)
- signout-callback.html -> [./src/asets/signout-callback.html](./src/asets/signout-callback.html)

To facilitate this last requirement, I recommend you utilize your angular.json and automate this process.

Open up your angular.json and navigate to the node for your project. Let's assume your project name is MyAngularProject and the folder name was my-angular-project. Just copy the code higlighted below to 'assets' node as shown below.

```javascript
"MyAngularProject": {
      "projectType": "application",
      "schematics": {
        "@nrwl/angular:component": {
          "style": "scss"
        }
      },
      "root": "apps/my-angular-project",
      "sourceRoot": "apps/my-angular-project/src",
      "prefix": "my-prefix",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/apps/my-angular-project",
            "index": "apps/my-angular-project/src/index.html",
            "main": "apps/my-angular-project/src/main.ts",
            "polyfills": "apps/my-angular-project/src/polyfills.ts",
            "tsConfig": "apps/my-angular-project/tsconfig.app.json",
            "aot": false,
            "assets": [
              "apps/my-angular-project/src/favicon.ico",
              "apps/my-angular-project/src/assets",
              "apps/my-angular-project/src/manifest.webmanifest",
              "apps/my-angular-project/src/assets",
              // THIS IS WHAT YOU'LL NEED TO ADD (START)
              {
                "glob": "*",
                "input": "node_modules/imng-auth0-oidc/assets",
                "output": "/"
              }
              // THIS IS WHAT YOU'LL NEED TO ADD (END)
            ],
```
