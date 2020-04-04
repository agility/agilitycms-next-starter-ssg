require('dotenv').config()

export default {
    guid: process.env.AGILITY_GUID, //Set your guid here
    fetchAPIKey: process.env.AGILITY_API_FETCH_KEY, //Set your fetch apikey here
    previewAPIKey: process.env.AGILITY_API_PREVIEW_KEY, //set your preview apikey
    languageCode: 'en-us', //the language for your website in Agility CMS
    channelName: 'website', //the name of your channel in Agility CMS
    securityKey: process.env.AGILITY_SECURITY_KEY //the website security key used to validate and generate preview keys
}