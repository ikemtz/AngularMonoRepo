#!/bin/bash
#

if [ $1 ]; then
az account set -s $1
fi

#az login (if required, should not be included in this script)

echo 'Spinning up resources for Angular App'
# parameter variables 

# Common Setup Variables
export location="eastus"
export planRgName="Az_Configuration"
export appsRgName="Az_Configuration"
export planName="AzConfig"
export app1Name="azconfig"
export dockerUrl=$(echo "https://index.docker.io")

# Service specific
export dockerImageName="ikemtz/azconfig:latest"

echo Create Web App Plan Resource Group $planRgName
export planRgId=$(az group create --location $location --name $planRgName | jq -r '. | .id')
echo Plan Group Id: ${planRgId}
echo

echo Create Web App Plan $planName
export appPlanId=$(az appservice plan create --resource-group $planRgName --name $planName --is-linux --sku B1 | jq -r '. | .id')
echo App Plan Id: ${appPlanId}
echo

echo Create Web Apps Resource Group $appsRgName
export appsRgId=$(az group create --location $location --name $appsRgName | jq -r '. | .id')
echo Apps Group Id: ${appPlanId}
echo

# this is necessary, otherwise create web app call will fail
rgCheck=$(az webapp list --query "[?name=='$app1Name'].{group:resourceGroup}" | jq -r '.[0].group')
if [ $rgCheck != ${appsRgName} ]
then
    echo Creating Web App $app1Name
    app1id=$(az webapp create \
        --name $app1Name \
        --plan $planName \
        --resource-group $planRgName \
        --deployment-container-image-name $dockerImageName \
        | jq -r '. | .id')
    echo App Id 1: ${app1id}

    az resource move --destination-group $appsRgName --ids $app1id
else
    echo Web App $app1Name already exists
    az webapp stop --name $app1Name --resource-group $appsRgName
    az webapp start --name $app1Name --resource-group $appsRgName
fi

echo Web App $app1Name already exists
app1id=$(az webapp show --name $app1Name --resource-group $appsRgName | jq -r '.id')

echo Configuring Web App $app1Name
app1Config=$(az webapp config container set --name $app1Name --resource-group $appsRgName \
    --docker-custom-image-name $dockerImageName \
    --docker-registry-server-url $dockerUrl \
    | jq -r '.')

echo App Id 1: ${app1id}
echo

temp=$(az webapp update --resource-group $appsRgName --name $app1Name --client-affinity-enabled false --https-only true)
temp=$(az webapp config appsettings set --resource-group $appsRgName --name $app1Name --settings DOCKER_ENABLE_CI=true | jq -r '.')
temp=$(az webapp config set --resource-group $appsRgName --name $app1Name --ftps-state Disabled --always-on true)
az webapp deployment container config --enable-cd true --name $app1Name --resource-group $appsRgName

az webapp stop --name $app1Name --resource-group $appsRgName
az webapp start --name $app1Name --resource-group $appsRgName
