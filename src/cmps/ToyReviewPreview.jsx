import React from 'react'

export function ToyReviewPreview({ review, onRemoveReview, toyId }) {
    return (
        <div className="toy-review-preview">
            <p><strong>By:</strong> {review.byUser ? review.byUser.fullname : 'Unknown User'}</p>
            <p>{review.txt}</p>
            <button className="remove-review-btn" onClick={() => onRemoveReview(review._id)}>x</button>
        </div>
    )
}
