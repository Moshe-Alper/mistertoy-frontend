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
    const [isLoadingMsg, setIsLoadingMsg] = useState(false)
    const [isShowMsgModal, setIsShowMsgModal] = useState(null)

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

    function onToggleMsgModal() {
        setIsShowMsgModal((prevIsMsgModal) => !prevIsMsgModal)
    }

    async function onSaveToyMsg(toyId, msgToAdd) {
        console.log('msgToAdd:', msgToAdd)
        try {
            setIsLoadingMsg(true);
            const msg = await toyService.saveMsg(toyId, msgToAdd)
            setToy(prevToy => ({
                ...prevToy,
                msgs: [msg, ...prevToy.msgs],
            }));
        } catch (err) {
            console.error('Failed to save message:', err)
            alert(`Failed to add message: ${err.message}`)
        } finally {
            setIsLoadingMsg(false)
        }
    }



    if (isLoading) return <AppLoader />
    if (!toy) return <p>Could not load toy details.</p>
    return (
        <section className="toy-details">
            <h1>Toy name : {toy.name}</h1>
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


            <button onClick={onToggleMsgModal}>Add a Message</button>
            {isShowMsgModal && (
                <AddToyMsg
                    toyId={toyId}
                    toggleMsg={onToggleMsgModal}
                    saveToyMsg={onSaveToyMsg}
                />
            )}

            <div className='msg-container'>
                {!isLoadingMsg
                    ? <ToyMsgList msgs={toy.msgs} />
                    : <AppLoader />
                }
            </div>
        </section>
    )
}
