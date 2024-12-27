import React from 'react'
import { ToyReviewPreview } from './ToyReviewPreview'

export function ToyReviewList({ toyId, reviews, onRemoveReview }) {
    if (!reviews || reviews.length === 0) {
        return <p>No reviews yet. Be the first to review!</p>
    }

    return (
        <div className="toy-review-list">
            {reviews.map(review => (
                <ToyReviewPreview
                    key={review._id}
                    toyId={toyId}
                    review={review}
                    onRemoveReview={onRemoveReview}
                />
            ))}
        </div>
    )
}
