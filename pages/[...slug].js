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

export async function unstable_getStaticProps (context) {
  console.log('getStaticProps context', context);
  return await getAgilityPageProps({ context });
}

export async function unstable_getStaticPaths(context) {  
  const resp =  await getAgilityPaths();
  console.log('getStaticPaths response', resp);
  return resp;
}

//Enable below for SSR
// AgilityPage.getInitialProps = async function(context) {
//   let resp = await getAgilityPageProps({ context });
//   return resp.props;
// }

export default AgilityPage