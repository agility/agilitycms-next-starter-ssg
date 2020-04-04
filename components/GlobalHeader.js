import React, { Component } from 'react';
import Link from 'next/link';

class GlobalHeader extends Component {
  renderHeader = () => {
    if (this.props.contentItem != null) {
      return <label>{this.props.contentItem.fields.siteName}</label>
    }
  }

  renderLinks = () => {
    if (this.props.sitemap != null) {

      let links = [];
      this.props.sitemap.forEach(node => {
        if(node.path !== '/') {
          links.push(<li key={node.pageID}><Link href="/[...slug]" as={node.path}><a>{node.menuText}</a></Link></li>)
        } else {
          links.push(<li key={node.pageID}><Link href={node.path}><a>{node.menuText}</a></Link></li>)
        }
      })
      return links;
    }
  }

  render() {
    return (
      <header className="header">
        <div className="container">
          {this.renderHeader()}
          <ul>
            {this.renderLinks()}
          </ul>
        </div>
      </header>
    );
  }
}

GlobalHeader.getCustomInitialProps = async function(props) {
  //console.log(props);
  const api = props.agility;
  const languageCode = props.languageCode;
  const channelName = props.channelName;
  let contentItem = null;
  let topLevelSitemap = [];

  try {
    //get the global header
    let contentItemList = await api.getContentList({
      referenceName: "globalheader",
      languageCode: languageCode
    });

    if (contentItemList && contentItemList.items) {
      contentItem = contentItemList.items[0];

    }
  } catch (error) {
    if (console) console.error("Could not load global header item.", error);
  }


  try {
    //get the nested sitemap
    let sitemap = await api.getSitemapNested({
      channelName: channelName,
      languageCode: languageCode,
    });

    //get rid of the children, we only care about the top-level
    sitemap = sitemap.forEach(s => {
      if(s.path == '/home') {
        s.path = '/'
      }
      s.children = [];
      topLevelSitemap.push(s);
    })


  } catch (error) {
    if (console) console.error("Could not load nested sitemap.", error);
  }

  return {
    contentItem,
    sitemap: topLevelSitemap
  }
}

export default GlobalHeader;
