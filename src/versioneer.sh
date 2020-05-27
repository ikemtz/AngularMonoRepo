#!/bin/bash
#
echo '** NPM Package Versioneer Script **'
ls ./libs/imng-*/package.json
echo BuildNumber $1
buildNumber=$1
value='s/\"version\"\: \"[0-9.]*\"/"version\"\: \"X\"/m'
value="${value/X/$buildNumber}"\

$(sed -i "$value" ./libs/imng-*/package.json)
