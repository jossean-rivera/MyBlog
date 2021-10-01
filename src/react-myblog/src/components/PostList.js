import React from 'react'
import { Link } from 'react-router-dom'
import { AuthenticatedTemplate } from "@azure/msal-react"
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Toast from 'react-bootstrap/Toast'
import { useSelector, useDispatch } from 'react-redux'
import {
    getErrorMessage, getPosts, getStatus,
    setErrorMessage, setSelectedPostID, loadPostsAsync
} from "../state/postsSlice"
import Status from '../enums/postsEffectStatus'

export default function PostList({ history }) {

    //  Get function to dispatch actions
    const dispatch = useDispatch()

    //  Query the store
    const error = useSelector(getErrorMessage)
    const posts = useSelector(getPosts)
    const status = useSelector(getStatus)
    const loading = status === Status.LOADING

    const onViewClick = postId => {
        dispatch(setSelectedPostID(postId))
        history.push(`/posts/${postId}`)
    }

    return (
        <>
            {error &&
                <div className="mb-3">
                    <Toast show={error} onClose={() => setErrorMessage('')}>
                        <Toast.Header>
                            <strong>Error</strong>
                        </Toast.Header>
                        <Toast.Body>{error}</Toast.Body>
                    </Toast>
                </div>
            }
            {posts?.map(post => (
                <div className="mb-4" key={post.postId}>
                    <h2>{post.title}</h2>
                    <h5>{post.subTitle}</h5>
                    <Button variant="primary" size="sm" onClick={() => onViewClick(post.postId)}>View</Button>
                </div>
            ))}
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
