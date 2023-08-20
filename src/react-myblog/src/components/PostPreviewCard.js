import React from 'react'
import { useDispatch } from 'react-redux'
import { Card } from 'react-bootstrap'
import { setSelectedPostID } from "../state/postsSlice"
import './PostPreviewCard.scss'

export default function PostPreviewCard({ post, history }) {
    //  Get function to dispatch actions
    const dispatch = useDispatch()

    const onViewClick = (evt, postId) => {
        evt.preventDefault()
        dispatch(setSelectedPostID(postId))
        history.push(`/posts/${postId}`)
    }

    const createDate = new Date(post.createDate);
    const formatDate = createDate.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    })

    return (
        <Card className="shadow-light-lg mb-5">
            <Card.Body className='my-auto'>
                <a href="#!" onClick={e => onViewClick(e, post.postId)}>
                    <h3 className="mt-auto">
                        {post.title}
                    </h3>

                    <p className="mb-0 text-muted">
                        {post.subTitle}
                    </p>
                </a>
            </Card.Body>
            <div className="card-meta" href="#!">

                <hr className="card-meta-divider" />

                <h6 className="text-uppercase text-muted mr-2 mb-0">
                    {post.createdBy}
                </h6>

                <p className="h6 text-uppercase text-muted mb-0 ml-auto">
                    <time datetime="2019-05-02">{formatDate}</time>
                </p>

            </div>
        </Card>
    )
}
