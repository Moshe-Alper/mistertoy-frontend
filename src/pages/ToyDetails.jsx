import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { toyService } from "../services/toy.service.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import { AppLoader } from "../cmps/AppLoader.jsx"
import { ToyMsgList } from "../cmps/ToyMsgList.jsx"
import { AddToyMsg } from "../cmps/AddToyMsg.jsx"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isShowMsgDialog, setIsShowMsgDialog] = useState(false)

    const user = useSelector(state => state.userModule.loggedInUser)

    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) loadToy()
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
        </section>
    )
}
