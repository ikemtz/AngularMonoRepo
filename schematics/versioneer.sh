#!/bin/bash
#
echo '** NPM Package Versioner Script **'
echo BuildNumber $1
buildNumber=$(sed -E 's/\.0?/\./g;t;d' <<< $1)
value='s/\"version\"\: \"[0-9.]*\"/"version\"\: \"X\"/m'
value="${value/X/$buildNumber}"\

$(sed -i "$value" ./package.json)
$(sed -i "$value" ./dist/package.json)
