import { useEffect, useState } from 'react' 
import { useSelector } from 'react-redux' 
 
import { loadReviews, removeReview } from '../store/actions/review.actions' 
 
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service' 
import { toyService } from '../services/toy.service' 
import { ToyReviewList } from '../cmps/ToyReviewList' 
 
export function ReviewExplore() { 
  const user = useSelector(storeState => storeState.userModule.loggedInUser) 
  const reviews = useSelector(storeState => storeState.reviewModule.reviews) 
 
  const [toys, setToys] = useState([]) 
  const [filterBy, setFilterBy] = useState('') 
  const [filteredReviews, setFilteredReviews] = useState(reviews) 

  useEffect(() => { 
    loadReviews() 
    loadToys() 
  }, []) 
 
  useEffect(() => { 
    setFilteredReviews(
      reviews.filter(review => 
        review.txt.toLowerCase().includes(filterBy.toLowerCase())
      )
    ) 
  }, [reviews, filterBy]) 

  async function loadToys() { 
    try { 
      const { toys } = await toyService.query({ isReviews: true }) 
      setToys(toys) 
    } catch (error) { 
      console.log('error:', error) 
    } 
  } 
 
  async function onRemoveReview(reviewId) { 
    try { 
      await removeReview(reviewId) 
      showSuccessMsg('Review removed') 
    } catch (err) { 
      showErrorMsg('Cannot remove') 
    } 
  } 
 
  function handleFilterChange(event) { 
    setFilterBy(event.target.value) 
  } 
 
  return ( 
    <div className="review-index"> 
      <h2>Explore Reviews</h2> 

      <input 
        type="text" 
        placeholder="Search reviews..." 
        value={filterBy} 
        onChange={handleFilterChange} 
      /> 

      {!!filteredReviews.length ? ( 
        <ToyReviewList 
          reviews={filteredReviews} 
          onRemoveReview={onRemoveReview} 
        /> 
      ) : ( 
        <p>No reviews match your search.</p> 
      )} 
    </div> 
  ) 
} 
