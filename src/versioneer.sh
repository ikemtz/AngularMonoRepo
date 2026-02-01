#!/bin/bash
#
echo '** NPM Package Versioneer Script **'
ls ./libs/imng-*/package.json
ls ./apps/*/src/environments/environment*ts

buildNumber=$(sed -E 's/\.0?/\./g;t;d' <<< "$1")
echo BuildNumber "$buildNumber"

packageRegex='s/\"version\"\: \"[0-9.]*\"/"version\"\: \"X\"/m'
packageRegex="${packageRegex/X/$buildNumber}"
echo regexString for packages "$packageRegex"
sed -i "$packageRegex" ./libs/imng-*/package.json

applicationRegex="s/version\: '[0-9.]*'/version: 'X'/m"
applicationRegex="${applicationRegex/X/$buildNumber}"
sed -i "$applicationRegex" ./apps/*/src/environments/environment*ts

latestValue="s/latest/${buildNumber}/g"
sed -i "$latestValue" ./libs/imng-angular-core/package.json

imngPackageRegex='s/(imng-[a-z-]*)": "0.0.0/$1": "'
imngPackageRegex="${imngPackageRegex}${buildNumber}/gm;t"
sed -i "$imngPackageRegex" ./libs/imng-*/package.json
