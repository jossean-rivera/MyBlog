import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { useAuthFetch } from '../hooks/useAuthFetch'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { savePostAsync, getStatus } from '../state/postsSlice'
import Status from '../enums/postsEffectStatus'


export default function AddPost() {
    const titleRef = useRef()
    const subTitleRef = useRef()
    const contentRef = useRef()
    const fetchAction = useAuthFetch()
    const dispatch = useDispatch()
    const status = useSelector(getStatus)

    const submitting = status === Status.SUBMITTING
    const saved = status === Status.SAVED

    async function submitHandler(e) {

        e.preventDefault();
        const newPost = {
            title: titleRef.current.value,
            subTitle: subTitleRef.current.value,
            content: contentRef.current.value,
            visible: true
        }
        dispatch(savePostAsync(fetchAction, newPost))
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
                    <Form.Control ref={titleRef}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Sub Title</Form.Label>
                    <Form.Control ref={subTitleRef}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Sub Title</Form.Label>
                    <Form.Control
                        ref={contentRef}
                        as="textarea"
                        placeholder="Write content..."
                        style={{ height: '100px' }}
                    />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Button variant="primary" type="submit" disabled={submitting}>
                        {submitting && <Spinner style={{ marginRight: '5px' }} animation="border" role="status" size="sm" />}
                    Submit
                </Button>
                    <Link to="/" className="mx-3">
                        <Button variant="secondary">Cancel</Button>
                    </Link>
                </Form.Group>
            </Form>
        </>
    )
}
