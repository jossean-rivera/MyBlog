import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { useAuthFetch } from '../hooks/useAuthFetch'
import { useDispatch, useSelector } from 'react-redux'
import { savePostAsync, getStatus, addPost, getSelectedPost, updatePost } from '../state/postsSlice'
import Status from '../enums/postsEffectStatus'

//  Setup timer before functions
const timingInterval = 2000;  //time in ms

export default function AddPost() {
    const fetchAction = useAuthFetch()
    const dispatch = useDispatch()
    const status = useSelector(getStatus)
    const edited = useRef(false)
    //const [post, setPost] = useState({ visible: true })
    const post = useSelector(getSelectedPost())

    const submitting = status === Status.SUBMITTING
    const saved = status === Status.SAVED

    useEffect(() => {
        //  Add a new post when the components mounts
        dispatch(addPost({ postId: 0, title: '', subTitle: '', content: '', visible: true }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (edited.current && !submitting) {

                //  Automatically save the post after the user
                //  is done typing for time amount equal to timingInterval
                dispatch(savePostAsync(fetchAction, post))
                edited.current = false
            }
        }, timingInterval)

        return () => clearTimeout(timeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post])


    //  If the component hasn't updated the store yet,
    //  display a loading icon
    if (!post) {
        return <Spinner animation="border" />
    }

    function submitHandler(e) {

        e.preventDefault()
        edited.current = false
        dispatch(savePostAsync(fetchAction, post))
    }

    //  input onChange handler that updates the state of the componet
    function inputChangeHandler(e) {
        e.preventDefault()
        edited.current = true
        dispatch(updatePost({ ...post, [e.target.name]: e.target.value }))
    }

    return (
        <>
            {
                saved &&
                <Alert variant="success">
                    Post has been saved
                </Alert>
            }
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
                    <Form.Label>Sub Title</Form.Label>
                    <Form.Control
                        name="content"
                        as="textarea"
                        rows={7}
                        value={post.content}
                        onChange={inputChangeHandler} >
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Button className="mt-3 me-2" variant="primary" type="submit" disabled={submitting || !edited.current}>
                        {submitting && <Spinner style={{ marginRight: '5px' }} animation="border" role="status" size="sm" />}
                        {submitting ? 'Saving...' : 'Save'}
                    </Button>
                    <Link to="/" className="mx-3">
                        <Button variant="secondary">Cancel</Button>
                    </Link>
                </Form.Group>
            </Form>
        </>
    )
}
