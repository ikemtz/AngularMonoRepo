#!/bin/bash
#
echo '** NPM Package Versioneer Script **'
ls ./libs/imng-*/package.json
ls ./apps/*/src/environments/environment*ts

echo BuildNumber $1
buildNumber=$(sed -E 's/.0/./g;t;d' <<< $1)
value='s/\"version\"\: \"[0-9.]*\"/"version\"\: \"X\"/m'
value="${value/X/$buildNumber}"\

$(sed -i "$value" ./libs/imng-*/package.json)
$(sed -i "$value" ./apps/*/src/environments/environment*ts)
