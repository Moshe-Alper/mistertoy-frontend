import { reviewService } from '../../services/review.service'
import {  ADD_REVIEW, REMOVE_REVIEW, SET_REVIEWS,} from '../reducers/review.reducer'

import { store } from '../store'

export async function loadReviews(filterBy = {}) {
  try {
    const reviews = await reviewService.query(filterBy)
    store.dispatch({ type: SET_REVIEWS, reviews })
  } catch (err) {
    console.log('ReviewActions: err in loadReviews', err)
    throw err
  }
}

export async function addReview(review) {
  try {
    const addedReview = await reviewService.add(review)
    store.dispatch(getActionAddReview(addedReview))
  } catch (err) {
    console.log('ReviewActions: err in addReview', err)
    throw err
  }
}

export async function removeReview(reviewId) {
  try {
    await reviewService.remove(reviewId)
    store.dispatch(getActionRemoveReview(reviewId))
  } catch (err) {
    console.log('ReviewActions: err in removeReview', err)
    throw err
  }
}
// Command Creators
export function getActionRemoveReview(reviewId) {
  return { type: REMOVE_REVIEW, reviewId }
}
export function getActionAddReview(review) {
  return { type: ADD_REVIEW, review }
}
