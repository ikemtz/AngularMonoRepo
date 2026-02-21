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

libs=(
  "imng-angular-core"
  "imng-application-insights-ngrx"
  "imng-kendo-chart-odata"
  "imng-kendo-data-entry"
  "imng-kendo-grid"
  "imng-kendo-grid-array"
  "imng-kendo-grid-editable"
  "imng-kendo-grid-filtering"
  "imng-kendo-grid-odata"
  "imng-kendo-ngrx-idle"
  "imng-kendo-odata"
  "imng-ngrx-utils"
  "imng-ngxb-typeahead"
  "imng-nrsrx-client-utils"
  "imng-odata-client"
  "imng-oidc-client"
  "imng-prime-table-odata"
  "imng-signalr-ngrx"
  "imng-kendo-testing-stubs"
)
for lib in "${libs[@]}"; do
  imngPackageRegex='s/Y": "[0-9.]*/Z": "X/gm;t'
  imngPackageRegex="${imngPackageRegex/Y/$lib}"
  imngPackageRegex="${imngPackageRegex/Z/$lib}"
  imngPackageRegex="${imngPackageRegex/X/$buildNumber}"
  sed -i "$imngPackageRegex" ./libs/imng-*/package.json
done
