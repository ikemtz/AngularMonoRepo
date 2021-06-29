#!/bin/bash
#
echo '** NPM Package Versioneer Script **'
ls ./libs/imng-*/package.json
ls ./apps/*/src/environments/environment*ts

buildNumber=$(sed -E 's/\.0?/\./g;t;d' <<< $1)
echo BuildNumber $buildNumber
value='s/\"version\"\: \"[0-9.]*\"/"version\"\: \"X\"/m'
value="${value/X/$buildNumber}"
echo regexString $value
$(sed -i "$value" ./libs/imng-*/package.json)
$(sed -i "$value" ./apps/*/src/environments/environment*ts)

latestValue="s/latest/${buildNumber}/g"
$(sed -i "$latestValue" ./libs/imng-angular-core/package.json)
