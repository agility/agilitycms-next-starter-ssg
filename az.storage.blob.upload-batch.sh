#!/bin/bash
# A simple Azure Storage example script

resourceGroup=$1
storageAccount=$2
sourceDir=$3

echo "Retrieving storage account key..."
storageAccountKey=$(az storage account keys list -g $resourceGroup -n $storageAccount --query [0].value -o tsv)

echo "Setting storage context..."
export AZURE_STORAGE_ACCOUNT=$storageAccount
export AZURE_STORAGE_KEY=$storageAccountKey

echo "Deleting existing files in web directory in $storageAccount"
az storage blob delete-batch --source $web

echo "Uploading /$sourceDir directory to $storageAccount static website container..."
az storage blob upload-batch -d '$web' -s $sourceDir

echo "Done!"
