
import GlobalHeader from './GlobalHeader'
import dynamic from 'next/dynamic'

export default function Layout(props) {
  
  const AgilityPageTemplate = dynamic(() => import ('../pageTemplates/' + props.pageTemplateName));
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
