# Next.js + Agility CMS + SSG 
This is sample Next.js starter site that uses Agility CMS and aims to be a foundation for building fully static sites using Next.js and Agility CMS.

> NextJS Preview is now supported! Docs coming soon...

[Live Website Demo (Zeit)](https://agility-next-starter-ssg.netlify.com/)

[New to Agility CMS? Signup for a free account](https://agilitycms.com/free)

# Why use Next.js as an SSG (Static Site Generator)
Next.js traditionaly provides two ways to run your Next.js web app.
1. SSR (Server Side Rendering)
2. Static HTML

As of v9.3, Next.js supports a third alternative - **Static Site Generator**.

If you are using *Server Side Rendering* (i.e. via `getInitialProps`) then your app runs JavaScript on the server as well as client (also referred to as an isomorphic app). This means you need to run a node.js web server as requests are processed at runtime and rendered. This means you need to manage the performance of your web app and the scaling problems that can come with it. If you want the most performant site possible, this will be challenging.

If you are not using `getInitialProps`, and you don't require any external data on load, then lucky for you, you can deploy this to a static host already (**Static HTML**). Unfortunately, for most sites this is not possible.

Now, with Next.js you can run a cmd `npm run export` which will run through your site and export the SSR pages as static html. This is great, because you can host the output on a static web host, but your code in `getIntitialProps` still runs on the client, so if you have any slow external data resources, they will still be visible to the end user.

Wouldn't it be great if we could just take an entire snapshot of a website and render it to static html and have any external data that we need just be stored in static JSON files? That is precisely why Next.js has introduced this feature.

For more detailed information around the update, please see [Static Generation/SSG Improvements](https://github.com/zeit/next.js/issues/9524).

# Benefits of SSG
- Best possible performance
- Secure - your website and its data become immutable
- Reliable and Accurate - your content and code become combined in your deployments
- Cheaper hosting 

# About
- connected to a sample Agility CMS instance to get content and pages
- uses the `getStaticProps` function from Next.js to allow for full static site generation
- supports full page management
- provides a functional structure that dynamically routes each page based on the request, loads a page template dynamically, and also dynamically loads and renders appropriate Agility CMS modules (as React components)

# Get Started
Sign up for an [Agility CMS Blog Starter](https://account.agilitycms.com/sign-up?product=agility-free) instance.

1. Clone this repository
2. Run `npm install`
3. Run `npm run dev`
4. Modify the `agility.config.js` and place your own *guid* and *apiKeys* (if you want to test this with your own instance - must be using the Blog Template) - you can also run it with the sandbox credentials provided

# Deploy
[![Deploy with ZEIT Now](https://zeit.co/button)](https://zeit.co/import/project?template=https://github.com/agility/agilitycms-next-starter-ssg)

☝️ Deploy this starter repo in just minutes with [ZEIT](https://zeit.co/). It will prompt you to enter your `AGILITY_GUID`, , `AGILITY_API_FETCH_KEY`, `AGILITY_API_PREVIEW_KEY`, and `AGILITY_SECURITY_KEY`.

# Notes
## How to Properly Link to a Page
Because we are using *dynamic pages* along with a catch-all route in Next.js, you'll need to use the following `<Link>` method to properly provide links to other dynamic pages while still having the client-side router pick them up. There is a current [issue](https://github.com/zeit/next.js/issues/8207) (as of v9.21) open for this for Next.js to handle it better, but for now you'll need to do this:
``` javascript
import Link from 'next/link';

//where '[...slug]' is the catch-all dynamic page we have (pages/[...slug].js)
// and '/posts' is the actual real page path for the page
<Link href="[...slug]" as="/posts"><a>{item.fields.title}</a></Link>
```

## How to Preview Content?
Since this is a static app, how can editors preview content in realtime as they are making them in the CMS? Zeit Now apparantly will support a great way to do this, but until then, you can run this in development mode (`npm run dev`) in a container on a web server. This ensures that the requests for each page are done at runtime.

> Native support for Preview with NextJS/Zeit is now enabled, documentation coming soon.

This repo is set up work with Azure Dev Ops (_azure-pipelines.yml_) and Docker (_DockerFile). This allows you to use Docker to build an image, and then push it to the Azure Container Registry of your choice. An Azure App Service that you setup would simply use the Registry to enable Continuous Deployment.

### Using Docker and Azure

1. Create an Azure Container Registry
```
az acr create --resource-group myResourceGroup --name <azureContainerRegistry> --sku Basic
```

2. Login to Azure Container Registry

If you are a user:
```
az acr login --name <azureContainerRegistryFQDN>
```

If you need to authenticate using an Azure Service Principal
```
docker login --name <azureContainerRegistryFQDN>/<nameOfImage>  -u <s_AppId> -p <s_Password>
```

3. Build the docker image locally
```
docker image build -t <azureContainerRegistryFQDN>/<nameOfImage> .   
```

4. Push the docker image
```
docker push <azureContainerRegistryFQDN>/<nameOfImage>
```

5. Create an Azure App Service Plan and Web App (Linux, using Docker Container)

| TODO: provide cli instructions

6. Ensure you have Continuous Deployment turned on - this will ensure pushes to your Azure Container Registry with the tag 'latest' will get pushed to your Azure App Service web app and deployed automatically.

| TODO: add link

#### Streaming Logs from Azure App Service Container
You can stream logs from the Azure App Service that is running your container using the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest).

1. Login to **Azure CLI** using your personal *Azure Account*:
  ```
  az login
  ```
  Or, use a *Service Principal* to login:
  ```
  az login --service-principal --username <APP_ID> --password <PASSWORD> --tenant <TENANT_ID>
  ```
  
2. Select your **Azure Subscription**
  ```
  az account set --subscription <SUBSCRIPTIONNAME>
  ```
  
3. Stream Web Logs:
  ```
  az webapp log tail --resource-group <RESOURCEGROUP> --name <APPSERVICENAME>
  ```
  


