#!/bin/bash
#

# Removing tslib dependency
value='s/\s*"tslib": "[0-9.>=x]*",\s*//g'
sed -i "$value" ./dist/libs/imng-*/package.json

# Removing  "require('@progress/kendo-angular-dialog')," from factory on imng-kend0-data-entry.umd.jsb
#value='s/require..@progress.kendo.angular.dialog...//g'
#$(sed -i "$value" ./dist/libs/imng-kendo-data-entry/bundles/imng-kendo-data-entry.umd.js)

#distributes license file to dist/libs subfolders
for i in dist/libs/*; do cp ../LICENSE "$i"; done;
