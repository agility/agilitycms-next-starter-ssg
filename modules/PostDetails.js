import React, { Component } from 'react';

class PostDetails extends Component {
    renderPostContent(html) {
        return { __html: html };
    }
    renderPost() {
        let post = null;

        if (this.props.customData.post != null) {

            post = (
                <div className="post">
                    <h1>{this.props.customData.post.fields.title}</h1>
                    {this.props.customData.post.fields.image &&
                        <img src={this.props.customData.post.fields.image.url + '?w=860'} alt={this.props.customData.post.fields.image.label} />
                    }
                    <div className="post-content" dangerouslySetInnerHTML={this.renderPostContent(this.props.customData.post.fields.details)}></div>
                </div>);

        }
        return post;
    }
    render() {
        return (
            <section className="post-details">
                <div className="container">
                    {this.renderPost()}
                </div>
            </section>
        );
    }
}

PostDetails.getCustomInitialProps = async function(props) {
    const api = props.agility;
    let post = null;
    try {

        post = await api.getContentItem({
            contentID: props.pageInSitemap.contentID,
            languageCode: props.languageCode
        });

    } catch (error) {
        if (console) console.log(error);
    }

    return {
        post: post
    }
}

export default PostDetails;
