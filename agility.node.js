import dynamic from 'next/dynamic'
import agilityContentFetch from '@agility/content-fetch'
import agilityConfig from './agility.config'

import GlobalHeader from './components/GlobalHeader'

//Agility API stuff
const previewAPIKey = agilityConfig.previewAPIKey;
const guid = agilityConfig.guid;
const languageCode = agilityConfig.languageCode;
const channelName = agilityConfig.channelName;
const isPreview = agilityConfig.isPreview;


export async function getAgilityPageProps({ context }) {
  
  let path = '/'; 
  if(context.params) {
    //build path by iterating through slugs
    path = '';
    context.params.slug.map(slug => {
        path += '/' + slug
    })
  }

  console.log(`Agility CMS => Getting page props for '${path}'...`);

  const agility = agilityContentFetch.getApi({
    guid: guid,
    apiKey: previewAPIKey,
    isPreview: isPreview
  });
  
  //get sitemap
  const sitemap = await agility.getSitemapFlat({channelName, languageCode});
  
  let pageInSitemap = sitemap[path];
  let page = null;
 

  if (path === '/') {
      let firstPagePathInSitemap = Object.keys(sitemap)[0];
      pageInSitemap = sitemap[firstPagePathInSitemap];
  } 

  if (pageInSitemap) {
    //get the page
   page = await agility.getPage({
        pageID: pageInSitemap.pageID,
        languageCode: languageCode
    });

  } else {
      //Could not find page
      console.error('page [' + path + '] not found in sitemap')

      //TODO: Redirect to 404 page
  }


  //resolve the page template
  const pageTemplateName = page.templateName.replace(/[^0-9a-zA-Z]/g, '');

  //resolve the modules per content zone
  let modulesPerContentZone = {};
  await asyncForEach(Object.keys(page.zones), async (zoneName) => {

    let modules = [];

    //grab the modules for this content zone
    const modulesForThisContentZone = page.zones[zoneName];
    
    //loop through the zone's modules
    await asyncForEach(modulesForThisContentZone, async (moduleItem) => {

      //find the react component to use for the module
      const ModuleComponentToRender = require('./modules/' + moduleItem.module + '.js').default;

      if (ModuleComponentToRender) {
        
        //resolve any additional data for the modules
        let moduleData = null;

        if(ModuleComponentToRender.getCustomInitialProps) {
          //we have some additional data in the module we'll need, execute that method now, so it can be included in SSG
          console.log(`Agility CMS => Fetching additional data via getCustomInitialProps for ${moduleItem.module}...`);
          moduleData = await ModuleComponentToRender.getCustomInitialProps({ 
            item: moduleItem.item,
            agility: agility,
            languageCode: languageCode,
            channelName: channelName,
            pageInSitemap: pageInSitemap
          });
        }      
        
        //if we have additional module data, then add it to the module props using 'customData'
        if(moduleData != null) {
          moduleItem.item.customData = moduleData;
        }

        modules.push({
          moduleName: moduleItem.module,
          item: moduleItem.item,
        })

      } else {
          console.error(`No react component found for the module "${moduleItem.module}". Cannot render module.`);
      }
    })

    
    //store as dictionary
    page.zones[zoneName] = modules;

  })

  //resolve data for other shared components
  const globalHeaderProps = await GlobalHeader.getCustomInitialProps({ agility: agility, languageCode: languageCode, channelName: channelName });

  //TODO: should reduce this response to only include fields that are used in direct output
  return {
      sitemapNode: pageInSitemap,
      page: page,
      pageTemplateName: pageTemplateName,
      globalHeaderProps: globalHeaderProps,
      languageCode: languageCode,
      channelName: channelName
  }
}

const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

export async function getAgilityPaths() {
    console.log(`Agility CMS => Fetching sitemap for getAgilityPaths...`);

    const agility = agilityContentFetch.getApi({
        guid: guid,
        apiKey: previewAPIKey,
        isPreview: isPreview
    });

    const sitemapFlat = await agility.getSitemapFlat({
        channelName,
        languageCode
    })


    return Object.keys(sitemapFlat).map(s => {
        //returns an array of paths as a string (i.e.  ['/home', '/posts'] as opposed to [{ params: { slug: 'home'}}]))
        return s; 
    })
}