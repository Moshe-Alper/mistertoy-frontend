import React from 'react'

export function ToyReviewPreview({ review, onRemoveReview, toyId }) {
    return (
        <div className="toy-review-preview">
            {/*  If `toyId` is undefined, the component is used on the UserDetails page.
            If `toyId` is defined, the component is used on the ToyDetails page. */}
            {toyId !== undefined && (
                <p><strong>By:</strong> {review.byUser ? review.byUser.fullname : 'Unknown User'}</p>
            )}            <p>{review.txt}</p>
            <button className="remove-review-btn" onClick={() => onRemoveReview(review._id)}>x</button>
        </div>
    )
}
