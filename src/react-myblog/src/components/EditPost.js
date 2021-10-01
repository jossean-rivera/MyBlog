import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useAuthFetch } from '../hooks/useAuthFetch'
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { useSelector, useDispatch } from 'react-redux'
import {
    getSelectedPost, getErrorMessage, loadPostsAsync, 
    savePostAsync, setSelectedPostID, updatePost, getStatus
} from '../state/postsSlice'
import Status from '../enums/postsEffectStatus'
import { Link } from 'react-router-dom'

/** Controlled component with form to edit existing post */
export default function EditPost() {
    const { postId } = useParams()
    const fetchAction = useAuthFetch()

    //  Get function to dispatch actions
    const dispatch = useDispatch()

    //  Query the store
    const errorMessage = useSelector(getErrorMessage)
    const post = useSelector(getSelectedPost(postId))
    const status = useSelector(getStatus)
    const submitting = status === Status.SUBMITTING
    const saved = status === Status.SAVED
    const loading = status === Status.LOADING

    useEffect(() => {
        //  Make sure the store is populated with posts
        dispatch(setSelectedPostID(postId))
        dispatch(loadPostsAsync())
    }, [dispatch, postId])

    //  If component hasn't fetch post, display spinner
    if (!post || loading) {
        return <Spinner animation="border" />
    }

    //  Submit handler that sends request to update existing post
    async function submitHandler(e) {
        e.preventDefault()
        dispatch(savePostAsync(fetchAction, post))
    }


    //  input onChange handler that updates the state of the componet
    function inputChangeHandler(e) {
        e.preventDefault()
        dispatch(updatePost({ ...post, [e.target.name]: e.target.value }))
    }

    return (
        <>
            {
                errorMessage &&
                <Alert variant="danger">
                    {errorMessage}
                </Alert>
            }
            {
                saved &&
                <Alert variant="success">
                    Post has been saved
                </Alert>
            }
            <h2>{post.title || 'NO TITLE'}</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        name="title"
                        value={post.title}
                        onChange={inputChangeHandler} >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Sub Title</Form.Label>
                    <Form.Control
                        name="subTitle"
                        value={post.subTitle}
                        onChange={inputChangeHandler} >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        name="content"
                        as="textarea"
                        value={post.content}
                        onChange={inputChangeHandler} >
                    </Form.Control>
                </Form.Group>

                <Button className="mt-3 me-2" variant="primary" type="submit" disabled={submitting}>
                    {submitting && <Spinner style={{ marginRight: '5px' }} animation="border" role="status" size="sm" />}
                    Submit
                </Button>
                <Link to={`/posts/${postId}`}>
                    <Button className="mt-3" variant="secondary">
                        Back
                    </Button>
                </Link>
            </Form>
        </>
    )
}
