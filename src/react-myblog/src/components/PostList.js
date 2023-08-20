import React from 'react'
import { Link } from 'react-router-dom'
import { AuthenticatedTemplate } from "@azure/msal-react"
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Toast from 'react-bootstrap/Toast'
import { useSelector, useDispatch } from 'react-redux'
import {
    getErrorMessage, getPosts, getStatus,
    setErrorMessage, loadPostsAsync
} from "../state/postsSlice"
import Status from '../enums/postsEffectStatus'
import PostPreviewCard from './PostPreviewCard'

export default function PostList({ history }) {

    //  Get function to dispatch actions
    const dispatch = useDispatch()

    //  Query the store
    const error = useSelector(getErrorMessage)
    const posts = useSelector(getPosts)
    const status = useSelector(getStatus)
    const loading = status === Status.LOADING

    return (
        <>
            {error &&
                <div className="mb-3">
                    <Toast show={error} onClose={() => dispatch(setErrorMessage(''))}>
                        <Toast.Header>
                            <strong>Error</strong>
                        </Toast.Header>
                        <Toast.Body>{error}</Toast.Body>
                    </Toast>
                </div>
            }
            {posts?.map(post => <PostPreviewCard key={post.postId} post={post} history={history} />)}
            <Button variant="primary" onClick={() => dispatch(loadPostsAsync())} disabled={loading}>
                {loading && <Spinner style={{ marginRight: '5px' }} animation="border" role="status" size="sm" />}
                Load Posts
            </Button>

            <AuthenticatedTemplate>
                <Link to="/posts/new" className="mx-3">
                    <Button variant="primary">New Post</Button>
                </Link>
            </AuthenticatedTemplate>
        </>
    )
}
