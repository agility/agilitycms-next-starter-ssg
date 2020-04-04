
import GlobalHeader from './GlobalHeader'

export default function Layout(props) {

  //BUG: when dynamic imports used in this case, the HTML does not output SSR
  //const AgilityPageTemplate = dynamic(() => import ('../pageTemplates/' + props.pageTemplateName));

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
