const POSTS_ENDPOINT = '/api/posts'

/** Creates URL endpoint for collection of posts or 
 * a URL for single post in case user passes an ID */
export function getPostsUrl(id) {
    if (id) {
        return `${POSTS_ENDPOINT}/${id}`
    }

    return POSTS_ENDPOINT
}