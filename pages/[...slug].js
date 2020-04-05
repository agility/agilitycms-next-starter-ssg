import React, { Component } from 'react';
import { getAgilityPageProps, getAgilityPaths } from '../agility.node'
import { handlePreview } from '../agility.browser'
import Layout from '../components/Layout'


class AgilityPage extends Component {
  render() {    
    handlePreview();

    return (
      <Layout {...this.props} />
    )
  }
}

export async function getStaticProps (context) {
  const props = await getAgilityPageProps({ context });
  return {
    props: props
  }
}

export async function getStaticPaths() {  
  const paths = await getAgilityPaths();
  return {
    paths: paths,
    fallback: true
  }
}

export default AgilityPage

