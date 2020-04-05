import PreviewBar from './PreviewBar'
import GlobalHeader from './GlobalHeader'
import { useRouter } from 'next/router'

export default function Layout(props) {

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  //BUG: when dynamic imports used in this case, the HTML does not output SSR
  //const AgilityPageTemplate = dynamic(() => import ('../pageTemplates/' + props.pageTemplateName));
  const AgilityPageTemplate = require('../pageTemplates/' + props.pageTemplateName + '.js').default;

  return (
    <div>

      <div className="App">
        <PreviewBar isPreview={props.isPreview} />
        <GlobalHeader {...props.globalHeaderProps}/>

        <main className="main">
          <AgilityPageTemplate {...props} />
        </main>
        
      </div>
    </div>
  )
}

