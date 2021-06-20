import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { useAuthFetch } from '../hooks/useAuthFetch'

export default function PostList() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchAction = useAuthFetch('/api/posts')

    async function OnLoadPosts() {
        setLoading(true)
        const data = await fetchAction()
        setPosts(data)
        setLoading(false)
    }

    return (
        <>
            {posts?.map(post => (
                <div key={post.postId}>
                    <h2>{post.title}</h2>
                    <h5>{post.subTitle}</h5>
                </div>
            ))}
            <Button variant="primary" onClick={OnLoadPosts} disabled={loading}>
                {loading && <Spinner style={{marginRight: '5px'}} animation="border" role="status" size="sm" />}
                Load Posts
            </Button>
        </>
    )
}
