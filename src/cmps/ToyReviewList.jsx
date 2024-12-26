import { ToyReviewPreview } from "./ToyReviewPreview"

export function ToyReviewList({ toyId, reviews}) {
    console.log('reviews:', reviews)
    return (
        <div>
            {reviews.map(review =>
                <ToyReviewPreview
                    key={review._id}
                    toyId={toyId}
                    review={review}
                />
            )}
        </div>
    )
}