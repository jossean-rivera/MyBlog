import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { AuthenticatedTemplate } from "@azure/msal-react"
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

export default function PostDisplay() {
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState({})
    const { postId } = useParams()

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true)
            const reponse = await fetch(`/api/posts/${postId}`)
            const json = await reponse.json()
            setPost(json)
            setLoading(false)
        };

        fetchPost()
        return () => setPost({})
    }, [postId])

    if (loading) {
        return <Spinner animation="border" />
    }

    return (
        <div>
            <h1>{post?.title || 'No Title'}</h1>
            <h5><i>{post?.subTitle || 'No Sub Title'}</i></h5>
            <p>{post?.content}</p>
            <AuthenticatedTemplate>
                <Link to={`/posts/${post.postId}/edit`}>
                    <Button variant="primary" size="sm">Edit</Button>
                </Link>
            </AuthenticatedTemplate>
        </div>
    )
}
