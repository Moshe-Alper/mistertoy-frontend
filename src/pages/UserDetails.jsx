import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { loadReviews, removeReview } from '../store/actions/review.actions'
import { ToyReviewList } from '../cmps/ToyReviewList'

export function UserDetails() {
  const user = useSelector(storeState => storeState.userModule.loggedInUser)
  const reviews = useSelector(storeState => storeState.reviewModule.reviews)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
      showErrorMsg('Please sign in first')
      return
    }
    loadReviews({ byUserId: user._id })
  }, [user])

  async function onRemoveReview(reviewId) {
    try {
      await removeReview(reviewId)
      showSuccessMsg('Review removed')
    } catch (err) {
      showErrorMsg('Cannot remove')
    }
  }

  if (!user) return

  return (
    <section className="user-details">
      <h1>Hello {user.fullname}</h1>
      <ToyReviewList
        reviews={reviews}
        onRemoveReview={onRemoveReview}
      />    </section>
  )
}
