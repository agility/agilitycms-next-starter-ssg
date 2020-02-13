#!/bin/bash
# Purges the CDN cache in Stackpath

client_id=$1
client_secret=$2

sudo apt-get --assume-yes install jq



access_token=$(curl --location --request POST 'https://gateway.stackpath.com/identity/v1/oauth2/token' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--data-raw '{"grant_type":"client_credentials","client_id":"'$client_id'","client_secret":"'$client_secret'"}' | jq .access_token)

echo $access_token

