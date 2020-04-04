import { validateSlugForPreview } from '../../agility.node'

export default async (req, res) => {
    // Clears the preview mode cookies.
    // This function accepts no arguments.
    res.clearPreviewData()

    const validateSlugResponse = await validateSlugForPreview({ slug: req.query.slug })

    if(validateSlugResponse.error) {
        //We are trying to redirect to a page that does not exist... redirect back to homepage to be safe
        res.writeHead(307, { Location: `/` });
        res.end()
        return;
    }

    // Redirect to the slug
    res.writeHead(307, { Location: req.query.slug })
    res.end()
}