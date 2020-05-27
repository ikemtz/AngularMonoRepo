#!/bin/bash
#
echo '** NPM Package Versioner Script **'
echo BuildNumber $1
buildNumber=$1
value='s/\"version\"\: \"[0-9.]*\"/"version\"\: \"X\"/m'
value="${value/X/$buildNumber}"\

$(sed -i "$value" ./package.json)
