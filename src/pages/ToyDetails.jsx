import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import { toyService } from "../services/toy.service.js"

import { AppLoader } from "../cmps/AppLoader.jsx"
import { ToyMsgList } from "../cmps/ToyMsgList.jsx"
import { AddToyMsg } from "../cmps/AddToyMsg.jsx"
import { addReview, loadReviews, removeReview } from "../store/actions/review.actions.js"
import { ToyReviewList } from "../cmps/ToyReviewList.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { ChatRoom } from "../cmps/ChatRoom.jsx"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [review, setReview] = useState({ txt: '' })

    const reviews = useSelector(state => state.reviewModule.reviews)
    const user = useSelector(state => state.userModule.loggedInUser)

    const [isLoading, setIsLoading] = useState(true)
    const [isShowMsgDialog, setIsShowMsgDialog] = useState(false)
    const [isShowReviewDialog, setIsShowReviewDialog] = useState(false)

    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) {
            loadToy()
            loadReviews({ aboutToyId: toyId })
        }
    }, [toyId])

    async function loadToy() {
        try {
            setIsLoading(true)
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            navigate('/toy')
        } finally {
            setIsLoading(false)
        }
    }

    function onToggleMsgDialog() {
        setIsShowMsgDialog((prevIsMsgModal) => !prevIsMsgModal)
    }

    async function onSubmitMsg(ev) {
        ev.preventDefault()
        const msgToAdd = { txt: ev.target.msg.value }
        try {
            await onSaveToyMsg(toyId, msgToAdd)
            ev.target.reset()
            onToggleMsgDialog()
        } catch (err) {
            console.error('Failed to add message:', err)
            alert(`Failed to add message: ${err.message}`)
        }
    }

    async function onSaveToyMsg(toyId, msgToAdd) {
        try {
            const msg = await toyService.saveToyMsg(toyId, msgToAdd)
            setToy(prevToy => ({
                ...prevToy,
                msgs: [msg, ...prevToy.msgs],
            }))
        } catch (err) {
            console.error('Failed to save message:', err)
            alert(`Failed to add message: ${err.message}`)
        }
    }

    async function onRemoveToyMsg(toyId, msgId) {
        try {
            await toyService.removeToyMsg(toyId, msgId)
            setToy(prevToy => ({
                ...prevToy,
                msgs: prevToy.msgs.filter(msg => msg.id !== msgId),
            }))
        } catch (err) {
            console.error('Failed to remove message:', err)
            alert(`Failed to remove message: ${err.message}`)
        }
    }

    async function onSaveReview(ev) {
        ev.preventDefault()
        const savedReview = {
            txt: review.txt,
            aboutToyId: toy._id,
        }
        try {
            addReview(savedReview)
            showSuccessMsg('Review saved!')

            setReview({ txt: '' })
            setIsShowReviewDialog(false)
        } catch (err) {
            console.log('error saving the review :', err)
            showErrorMsg('Had issues saving review')

        }
    }

    async function onRemoveReview(reviewId) {
        try {
            removeReview(reviewId)
            showSuccessMsg('Review removed!')
        } catch (err) {
            console.log('problem with removing review', err)
            showErrorMsg('Had issues removing review')

        }
    }

    function handleReviewChange({ target }) {
        const { name: field, value } = target
        setReview(review => ({ ...review, [field]: value }))
    }

    if (isLoading) return <AppLoader />
    if (!toy) return <p>No Details</p>
    return (
        <section className="toy-details">
            <h1>{toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <p>
                {toy.inStock
                    ? <span style={{ color: 'green' }}>In Stock</span>
                    : <span style={{ color: 'red' }}>Out of Stock</span>}
            </p>
            {toy.labels && toy.labels.length > 0 && (
                <p>Labels: {toy.labels.join(", ")}</p>
            )}
            <nav className='toy-details-nav'>
                {user && user.isAdmin && (
                    <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                )}
                <Link to={`/toy`}>Back</Link>
            </nav>

            <div className='break-line'></div>

            {user && (
                <>
                    <button className="add-msg-btn" onClick={onToggleMsgDialog}>Add a Message</button>
                    <dialog open={isShowMsgDialog} onClose={onToggleMsgDialog}>
                        <form onSubmit={onSubmitMsg}>
                            <h3>Add Message</h3>
                            <textarea name="msg" required placeholder="Enter your message here"></textarea>
                            <div>
                                <button type="submit">Save Message</button>
                                <button type="button" onClick={onToggleMsgDialog}>Cancel</button>
                            </div>
                        </form>
                    </dialog>
                </>
            )}
            <div className="msg-container">
                {toy.msgs?.length > 0 ? (
                    <ToyMsgList
                        toyId={toy._id}
                        msgs={toy.msgs}
                        onRemoveToyMsg={onRemoveToyMsg}
                    />
                ) : (
                    <p>No messages</p>
                )}
            </div>

            <div className="review-container">
                <h3>Reviews</h3>
                {user && (
                    <>
                        <button className="add-review-btn" onClick={() => setIsShowReviewDialog(true)}>
                            Add a Review
                        </button>
                        <dialog open={isShowReviewDialog} onClose={() => setIsShowReviewDialog(false)}>
                            <form onSubmit={onSaveReview}>
                                <h3>Add Review</h3>
                                <textarea
                                    name="txt"
                                    value={review.txt}
                                    placeholder="Enter your review here"
                                    onChange={handleReviewChange}
                                    required
                                ></textarea>
                                <div>
                                    <button type="submit">Save Review</button>
                                    <button type="button" onClick={() => setIsShowReviewDialog(false)}>Cancel</button>
                                </div>
                            </form>
                        </dialog>
                    </>
                )}

                <ToyReviewList
                    toyId={toy._id}
                    reviews={reviews}
                    onRemoveReview={onRemoveReview}
                />
            </div>
            <div className="chat-container">
            {user && (
                <ChatRoom
                    toyId={toy._id}
                />
            )}
            </div>
        </section>
    )
}
