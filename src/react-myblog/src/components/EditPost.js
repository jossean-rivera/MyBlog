import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'

export default function EditPost({ postId }) {
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState({})

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
        </div>
    )
}
