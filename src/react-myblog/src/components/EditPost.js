import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function EditPost() {
    const { postId } = useParams()
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState({})
    const titleRef = useRef()

    useEffect(() => {
        titleRef.current.value = 'Testing'
    }, [titleRef])

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true)
            const resp = await fetch(`/api/posts/${postId}`)
            const respPost = await resp.json()
            setPost(respPost)
            setLoading(false)
        };

        fetchPost()
    }, [postId])

    if (loading) {
        return <Spinner animation="border" />
    }

    function submitHandler(e) {

        e.preventDefault();
    }

    return (
        <div>
            <h1>{post?.title || 'No Title'}</h1>
            <h5><i>{post?.subTitle || 'No Sub Title'}</i></h5>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control ref={titleRef}></Form.Control>
                </Form.Group>
                <Button className="mt-3" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
