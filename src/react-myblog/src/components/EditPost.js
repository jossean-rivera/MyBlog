import React, { useState, useEffect } from 'react'
import { Redirect, useParams } from 'react-router'
import { useAuthFetch } from '../hooks/useAuthFetch'
import { getPostsUrl } from '../apiConfig'
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

/** Controlled component with form to edit existing post */
export default function EditPost() {
    const { postId } = useParams()
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [post, setPost] = useState({})
    const [errorMessage, setErrorMessage] = useState('')
    const fetchAction = useAuthFetch()

    useEffect(() => {

        //  Fetch post and update state after component renders
        const fetchPost = async () => {
            setLoading(true)
            const url = getPostsUrl(postId)
            const resp = await fetch(url)

            if (resp.ok) {
                const json = await resp.json()
                setPost(json)
            } else {
                const text = await resp.text()
                setErrorMessage(text)
            }

            setLoading(false)
        };

        fetchPost()
    }, [postId])

    //  If component hasn't fetch post, display spinner
    if (loading) {
        return <Spinner animation="border" />
    }

    //  If component submitted the form successfully, then redirect user
    if (redirect) {
        return <Redirect to={`/posts/${postId}`} />
    }

    //  Submit handler that sends request to update existing post
    async function submitHandler(e) {
        e.preventDefault()
        setLoading(true)

        try {
            const url = getPostsUrl()
            await fetchAction('PUT', url, post)
            setRedirect(true)
        } catch (err) {
            setErrorMessage(err.message || 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }


    //  input onChange handler that updates the state of the componet
    function inputChangeHandler(e) {
        e.preventDefault()
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    return (
        <>
            {
                errorMessage &&
                <Alert variant="danger">
                    {errorMessage}
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
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        name="content"
                        as="textarea"
                        value={post.content}
                        onChange={inputChangeHandler} >
                    </Form.Control>
                </Form.Group>

                <Button className="mt-3" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}
