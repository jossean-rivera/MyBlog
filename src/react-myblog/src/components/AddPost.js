import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useAuthFetch } from '../hooks/useAuthFetch'
import { Redirect } from 'react-router-dom'


export default function AddPost() {
    const titleRef = useRef()
    const subTitleRef = useRef()
    const contentRef = useRef()
    const [postCreated, setPostCreated] = useState(false)
    const fetchAction = useAuthFetch()

    async function submitHandler(e) {

        e.preventDefault();
        const requestBody = {
            title: titleRef.current.value,
            subTitle: subTitleRef.current.value,
            content: contentRef.current.value,
            visible: true
        }
        const newPost = await fetchAction('POST', "/api/posts", requestBody)
        setPostCreated(newPost !== null && newPost !== undefined)
    }

    if (postCreated) {
        return <Redirect to="/" />
    }

    return (
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
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Link to="/" className="mx-3">
                    <Button variant="secondary">Cancel</Button>
                </Link>
            </Form.Group>
        </Form>

    )
}
