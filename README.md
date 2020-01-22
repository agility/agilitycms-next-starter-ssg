This is sample NextJS starter site that uses Agility CMS and aims to be a foundation for building Static Sites using NextJS and Agility CMS.

**This template provides the following features:**
- connected to a sample Agility CMS instance to get content and pages
- uses the `unstable_getStaticProps` (unstable as of Next v9.2) function from NextJS to allow for full static site generation
- supports full page management
- provides a functional structure that dynamically routes each page based on the request, loads a page template dynamically, and also dynamically loads and renders appropriate Agility CMS modules (as React components)

**TODO:**
- wait until `unstable_getStaticProps` is stable and implement this
- need to implement static routing paths for proper SSG output of all pages

# Get Started
1. Clone this repository
2. Run `npm install`
3. Run `npm run dev`
4. Optionally modify the `agility.config.js` and place your own *guid* and *apiKeys* (if you want to test this with your own instance - must be using the Blog Template)

# Deploy
1. Run `npm run build`
2. Run `npm run export` to export the site as an SSG
3. Prior to deploying this to webhost, you can run it locally using `serve -p 8000` to verify the output
4. Deploy to a static service such as Netlify or Zeit