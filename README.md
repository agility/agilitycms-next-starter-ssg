This is sample NextJS starter site that uses Agility CMS and aims to be a foundation for building Static Sites using NextJS and Agility CMS.

# Why use NextJS as an SSG (Static Site Generator)
NextJS traditionaly provides two ways to run your NextJS web app.
1. SSR (Server Side Rendering)
2. Static HTML

As of v9.2, NextJS supports a third alternative - **Static Site Generator**.

If you are using *Server Side Rendering* (i.e. via `getInitialProps`) then your app runs JavaScript on the server as well as client (also referred to as an isomorphic app). This means you need to run a node.js web server as requests are processed at runtime and rendered. This means you need to manage the performance of your web app and the scaling problems that can come with it. If you want the most performant site possible, this will be challenging.

If you are not using `getInitialProps`, and you don't require any external data on load, then lucky for you, you can deploy this to a static host already (**Static HTML**). Unfortunately, for most sites this is not possible.

Now, with NextJS you can run a cmd `npm run export` which will run through your site and export the SSR pages as static html. This is great, because you can host the output on a static web host, but your code in `getIntitialProps` still runs on the client, so if you have any slow external data resources, they will still be visible to the end user.

Wouldn't it be great if we could just take an entire snapshot of a website and render it to static html and have any external data that we need just be stored in static JSON files? That is precisely why NextJS has introduced this feature.

For more detailed information around the update, please see [Static Generation/SSG Improvements](https://github.com/zeit/next.js/issues/9524).

# Benefits of SSG
- Best possible performance
- Secure - your website and its data become immutable
- Reliable and Accurate - your content and code become combined in your deployments
- Cheaper hosting 

# About
- connected to a sample Agility CMS instance to get content and pages
- uses the `unstable_getStaticProps` (unstable as of Next v9.2) function from NextJS to allow for full static site generation
- supports full page management
- provides a functional structure that dynamically routes each page based on the request, loads a page template dynamically, and also dynamically loads and renders appropriate Agility CMS modules (as React components)

# TODO
- wait until `unstable_getStaticProps` and `unstable_getStaticPaths` is stable, probably next v9.3

# Get Started
Sign up for an [Agility CMS Blog Starter](https://account.agilitycms.com/sign-up?product=agility-free) instance.

1. Clone this repository
2. Run `npm install`
3. Run `npm run dev`
4. Modify the `agility.config.js` and place your own *guid* and *apiKeys* (if you want to test this with your own instance - must be using the Blog Template) - you can also run it with the sandbox credentials provided

# Deploy
1. Run `npm run build`
2. Run `npm run export` to export the site as an SSG
3. Prior to deploying this to webhost, you can run it locally using `serve -p 8000` to verify the output
4. Deploy to a static hosting service such as Netlify or Zeit

# Notes
## How to Properly Link to a Page
Becaue we are using *dynamic pages* in NextJS, you'll need to use the following `<Link>` method to properly provide links to other dynamic pages while still having the client-side router pick them up. There is a current [issue](https://github.com/zeit/next.js/issues/8207) open for this for NextJS to handle it better, but for now you'll need to do this:
```
import Link from 'next/link';

//where '[...slug]' is the catch-all dynamic page we have (pages/[...slug].js) and '/posts' is the actual real page path for the page
<Link href="[...slug]" as="/posts"><a>{item.fields.title}</a></Link>
```
