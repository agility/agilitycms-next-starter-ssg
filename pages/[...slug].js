import React, { Component } from 'react';
import { getAgilityPageProps} from '../agility.node'
import Layout from '../components/Layout'


class AgilityPage extends Component {
  render() {
    return (
      <Layout {...this.props} />
    )
  }
}

export async function unstable_getStaticProps (context) {
  return await getAgilityPageProps({ context });
}

// AgilityPage.getInitialProps = async function(context) {
//   let resp = await getAgilityPageProps({ context });
//   return resp.props;
// }

export default AgilityPage
