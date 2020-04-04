import React, { Component } from 'react';
import Link from 'next/link';
import truncate from 'truncate-html'

class PostsListing extends Component {
    renderPostExcerpt(html) {
        const excerpt = truncate(html, { stripTags: true, length: 160 });
        return { __html: excerpt };
    }
    renderPosts() {
        if (this.props.customData.posts != null) {
            let posts = [];
            this.props.customData.posts.forEach(item => {
                posts.push(
                    <div className="post" key={item.contentID}>
                        {item.fields.image &&
                            <img src={item.fields.image.url + '?w=860'} alt={item.fields.image.label} />
                        }
                        <h2>
                            <Link href="[...slug]" as={this.props.customData.dynamicUrls[item.contentID]}><a>{item.fields.title}</a></Link>
                        </h2>
                        <p dangerouslySetInnerHTML={this.renderPostExcerpt(item.fields.details)}></p>
                    </div>
                )
            })

            return posts;
        }
    }
    render() {

        return (
            <section className="posts-listing">
                <div className="container">
                    <h1>{this.props.fields.title}</h1>
                    {this.renderPosts()}
                </div>
            </section>
        );
    }
}

PostsListing.resolvePostUrls = function (sitemap, posts) {
    let dynamicUrls = {};
    posts.forEach(post => {
        Object.keys(sitemap).forEach(path => {
            if (sitemap[path].contentID === post.contentID) {
                dynamicUrls[post.contentID] = path;
            }
        })
    })
    return dynamicUrls;
}

PostsListing.getCustomInitialProps = async function(props) {
    const api = props.agility;
    try {

        //get sitemap first, need it to find the dynamic urls
        let sitemap = await api.getSitemapFlat({
            channelName: props.channelName,
            languageCode: props.languageCode
        });

        //then get our posts
        let contentListResult = await api.getContentList({
            referenceName: 'posts',
            languageCode: props.languageCode
        });

        const dynamicUrls = this.resolvePostUrls(sitemap, contentListResult.items)

        //TODO: should reduce this response to only include fields that are used in direct output
        return {
            posts: contentListResult.items, 
            dynamicUrls: dynamicUrls 
        };

    } catch (error) {
        if (console) console.error(error);
    }
}

export default PostsListing;
