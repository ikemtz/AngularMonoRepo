#!/bin/bash
#
value='s/\"version\"\: \"[0-9.]*\"/"version\"\: \"X\"/m'
value="${value/X/$buildNumber}"\

sed -i "$value" **/package.json
