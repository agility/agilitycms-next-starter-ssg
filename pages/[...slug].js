import React, { Component } from 'react';
import { getAgilityPageProps, getAgilityPaths } from '../agility.node'
import Layout from '../components/Layout'


class AgilityPage extends Component {
  render() {    
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

export async function getStaticPaths(context) {  
  const paths =  await getAgilityPaths();
  return {
    paths: paths,
    fallback: false
  }
}

//Enable below for SSR
// AgilityPage.getInitialProps = async function(context) {
//   let resp = await getAgilityPageProps({ context });
//   return resp.props;
// }

export default AgilityPage