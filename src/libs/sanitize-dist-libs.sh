#!/bin/bash
#

//Remove tslib dependency
value='s/\s*"tslib": "[0-9.>=x]*",\s*//g'
$(sed -i "$value" ../dist/libs/imng-*/package.json)
