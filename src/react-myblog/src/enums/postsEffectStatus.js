
//  Status of a side effect regarding posts 
//  (e.g., loading posts, adding a post, updating an existing post)
const PostEffectStatus = {
    INITIAL: 'initial',
    LOADING: 'loading',
    LOADED: 'loaded',
    SUBMITTING: 'submitting',
    SAVED: 'saved',
    REDIRECTED: 'redirected',
    FAILED: 'failed',
}

export default PostEffectStatus;