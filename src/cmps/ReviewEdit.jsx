import { useState } from 'react'

import { addReview } from '../store/actions/review.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function ReviewEdit({ toys }) {
  const [reviewToEdit, setReviewToEdit] = useState({ txt: '', aboutToyId: '' })

  function handleChange(ev) {
    const { name, value } = ev.target
    setReviewToEdit({ ...reviewToEdit, [name]: value })
  }

  async function onAddReview(ev) {
    ev.preventDefault()
    if (!reviewToEdit.txt || !reviewToEdit.aboutToyId)
      return alert('All fields are required')

    try {
      await addReview(reviewToEdit)
      showSuccessMsg('Review added')
      setReviewToEdit({ txt: '', aboutToyId: '' })
    } catch (err) {
      showErrorMsg('Cannot add review')
    }
  }

  return (
    <form className="review-edit" onSubmit={onAddReview}>
      <select
        onChange={handleChange}
        value={reviewToEdit.aboutToyId}
        name="aboutToyId"
      >
        <option value="">Review about...</option>
        {toys.map(toy => (
          <option key={toy._id} value={toy._id}>
            {toy.name}
          </option>
        ))}
      </select>
      <textarea
        name="txt"
        onChange={handleChange}
        value={reviewToEdit.txt}
      ></textarea>
      <button>Add</button>
    </form>
  )
}
