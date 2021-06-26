import React, { useState, useEffect } from 'react'
import { Redirect, useParams } from 'react-router'
import { getPostsUrl } from '../apiConfig'
import { useAuthFetch } from '../hooks/useAuthFetch'
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

export default function DeletePost() {
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
        return <Redirect to="/" />
    }

    //  Submit handler that sends request to delete an existing post
    async function submitHandler(e) {
        e.preventDefault()
        setLoading(true)

        try {
            const url = getPostsUrl(postId)
            await fetchAction('DELETE', url, post)
            setRedirect(true)
        } catch (err) {
            setErrorMessage(err.message || 'Seeafshd')
        } finally {
            setLoading(false)
        }
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

                <Alert variant="warning">
                    <Alert.Heading>Are you sure you want to remove this post?</Alert.Heading>
                    <p>This action cannot be reversed.</p>
                </Alert>

                <h1>{post.title}</h1>
                <h5><i>{post.subTitle}</i></h5>
                <p>{post.content}</p>

                <Button className="mt-3 text-white" variant="danger" type="submit">
                    Delete
                </Button>
            </Form>
        </>
    )
}
