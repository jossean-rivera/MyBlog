import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { AuthenticatedTemplate } from '@azure/msal-react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'
import {
    getSelectedPostID, getSelectedPost, getErrorMessage,
    loadPostsAsync, getStatus
} from '../state/postsSlice'
import Status from '../enums/postsEffectStatus'

export default function PostDisplay() {
    const { postId } = useParams()

    //  Get function to dispatch actions
    const dispatch = useDispatch()

    //  Query the store
    const selectedPostID = useSelector(getSelectedPostID);
    const error = useSelector(getErrorMessage)
    const post = useSelector(getSelectedPost(selectedPostID || postId))
    const status = useSelector(getStatus)
    const loading = status === Status.LOADING


    useEffect(() => {
        //  Ensure the store has the loaded posts
        dispatch(loadPostsAsync())
    }, [dispatch, postId])

    if (loading) {
        return <Spinner animation="border" />
    }

    if (error) {
        return <h5 className="text-error">{error}</h5>
    }

    return (
        <div>
            <h1>{post?.title || 'No Title'}</h1>
            <h5><i>{post?.subTitle || 'No Sub Title'}</i></h5>
            <p>{post?.content}</p>
            <AuthenticatedTemplate>
                <Link to={`/posts/${post?.postId}/edit`}>
                    <Button variant="primary" size="sm">Edit</Button>
                </Link>
                <Link to={`/posts/${post?.postId}/delete`}>
                    <Button className="mx-3 text-white" variant="danger" size="sm">Delete</Button>
                </Link>
            </AuthenticatedTemplate>
            <Link to="/"><span className="text-dark">&#60; Back</span></Link>
        </div>
    )
}
