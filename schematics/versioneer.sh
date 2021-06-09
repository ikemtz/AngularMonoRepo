#!/bin/bash
#
echo '** NPM Package Versioner Script **'
buildNumber=$(sed -E 's/\.0?/\./g;t;d' <<< $1)
echo BuildNumber $buildNumber
value='s/\"version\"\: \"[0-9.]*\"/"version\"\: \"X\"/m'
value="${value/X/$buildNumber}"\

$(sed -i "$value" ./package.json)
$(sed -i "$value" ./dist/package.json)
