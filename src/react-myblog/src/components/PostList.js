import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Toast from 'react-bootstrap/Toast'

export default function PostList() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')


    async function OnLoadPosts() {
        setLoading(true)
        try {
            const response = await fetch('/api/posts')
            const json = await response.json()
            setPosts(json)
            setLoading(false)
        }
        catch {
            setError('There was an error while trying to get post. Try again.')
            setLoading(false)
        }
    }

    return (
        <>
            {error &&
                <div className="mb-3">
                    <Toast show={error} onClose={() => setError('')}>
                        <Toast.Header>
                            <strong>Error</strong>
                        </Toast.Header>
                        <Toast.Body>{error}</Toast.Body>
                    </Toast>
                </div>
            }

            {posts?.map(post => (
                <div className="mb-4" key={post.postId}>
                    <h2>{post.title}</h2>
                    <h5>{post.subTitle}</h5>
                    <Link to={`posts/${post.postId}`}>
                        <Button variant="primary" size="sm">View</Button>
                    </Link>
                </div>
            ))}
            <Button variant="primary" onClick={OnLoadPosts} disabled={loading}>
                {loading && <Spinner style={{ marginRight: '5px' }} animation="border" role="status" size="sm" />}
                Load Posts
            </Button>
        </>
    )
}
