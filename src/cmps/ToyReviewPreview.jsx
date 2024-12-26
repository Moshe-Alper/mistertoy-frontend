import React from 'react'

export function ToyReviewPreview({ toyId, review }) {
    return (
        <div>
            <strong>By:</strong> {review.byUser ? review.byUser.fullname : 'Unknown User'}
            <p>{review.txt}</p>
        </div>
    )
}
