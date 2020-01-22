
import GlobalHeader from './GlobalHeader'
import dynamic from 'next/dynamic'
import agilityConfig from '../agility.config'

const pageTemplates = agilityConfig.pageTemplateComponents;

export default function Layout(props) {
  
  //BUG: when dynamic imports used in this case, the HTML does not output SSR
  //const AgilityPageTemplate = dynamic(() => import ('../pageTemplates/' + props.pageTemplateName));

  //HACK: probably not the best idea for every page to have a dependency on all the page template components being loaded, even when we don't use them...
  //const AgilityPageTemplate = pageTemplates[props.pageTemplateName];

  const AgilityPageTemplate = require('../pageTemplates/' + props.pageTemplateName + '.js').default;

  return (
    <div>

      <div className="App">
        <GlobalHeader {...props.globalHeaderProps}/>

        <main className="main">
          <AgilityPageTemplate {...props} />
        </main>
        
      </div>
    </div>
  )
}
