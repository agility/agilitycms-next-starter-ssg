#!/bin/bash
# Purges the CDN cache in Stackpath


client_id=$1
client_secret=$2
stack_id=$3
cdn_url=$4

echo "Requesting access token from Stackpath..."

access_token=$(curl --location --request POST 'https://gateway.stackpath.com/identity/v1/oauth2/token' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--data-raw '{"grant_type":"client_credentials","client_id":"'$client_id'","client_secret":"'$client_secret'"}' | jq --raw-output .access_token)

echo "Purging CDN for $cdn_url ..."
curl --location --request POST "https://gateway.stackpath.com/cdn/v1/stacks/$stack_id/purge" \
--header "Authorization: bearer $access_token" \
--header "Content-Type: application/json" \
--data-raw '{ 
	"items": [
		{
		"url": "'$cdn_url'",
		"recursive": true,
		"invalidateOnly": false,
		"purgeAllDynamic": false,
		"headers": [],
		"purgeSelector": []
		}
	]
}'

echo "Done!"

