import dynamic from 'next/dynamic'
import agilityContentFetch from '@agility/content-fetch'
import agilityConfig from './agility.config'

import GlobalHeader from './components/GlobalHeader'


export async function getAgilityPageProps({ context }) {
  console.log('getAgilityPageProps fired!')

  const previewAPIKey = agilityConfig.previewAPIKey;
  const guid = agilityConfig.guid;
  const languageCode = agilityConfig.languageCode;
  const channelName = agilityConfig.channelName;
  const isPreview = agilityConfig.isPreview;

  const agility = agilityContentFetch.getApi({
    guid: guid,
    apiKey: previewAPIKey,
    isPreview: isPreview
  });
  
  //get sitemap
  const sitemap = await agility.getSitemapFlat({channelName, languageCode});
  
  let path = '/'; // HACK
  if(context.params) {
    path = '/' + context.params.slug;
  }
  
  
  let pageInSitemap = sitemap[path];
  let page = null;
 
  //console.log(path);

  if (path === '/') {
      let firstPagePathInSitemap = Object.keys(sitemap)[0];
      pageInSitemap = sitemap[firstPagePathInSitemap];
  } 

  //console.log(pageInSitemap);

  if (pageInSitemap) {
    //get the page
   page = await agility.getPage({
        pageID: pageInSitemap.pageID,
        languageCode: languageCode
    });

  } else {
      //Could not find page
      console.error('page not found in sitemap')

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
      const ModuleComponentToRender = agilityConfig.moduleComponents[moduleItem.module];

      if (ModuleComponentToRender) {
        
        //resolve any additional data for the modules
        let moduleData = null;

        if(ModuleComponentToRender.getCustomInitialProps) {
          //we have some additional data in the module we'll need, execute that method now, so it can be included in SSG
          console.log('Fetching additional data for ' + moduleItem.module);
          moduleData = await ModuleComponentToRender.getCustomInitialProps({ 
            item: moduleItem.item,
            agility: agility,
            languageCode: languageCode,
            channelName: channelName
          });
        } else {
            console.log('No data func for ' + moduleItem.module);
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
    modulesPerContentZone[zoneName] = modules;

  })

  //resolve data for other shared components
  const globalHeaderProps = await GlobalHeader.getCustomInitialProps({ agility: agility, languageCode: languageCode, channelName: channelName });

  return {
    props: {
      sitemapNode: pageInSitemap,
      page: page,
      pageTemplateName: pageTemplateName,
      globalHeaderProps: globalHeaderProps,
      languageCode: languageCode,
      channelName: channelName,
      modulesPerContentZone: modulesPerContentZone
    }
  }
}

const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}
