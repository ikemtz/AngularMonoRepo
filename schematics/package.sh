#!/bin/bash
#
for sourceFile in $(find ./src/**/schema.json)
do
  export outputFile=$(echo ${sourceFile/.\/src\//.\/dist\/schematics\/})
  cp -v $sourceFile $outputFile
done

for sourceFile in $(find ./src/**/files/**)
do
  export outputFile=$(echo ${sourceFile/.\/src\//.\/dist\/schematics\/})
  export outputDirectory=$(dirname "${outputFile}")
  echo $outputDirectory
  mkdir -pv $outputDirectory
  cp -rv $sourceFile $outputFile
done

cp -v ./src/collection.json ./dist/schematics/
