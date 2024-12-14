import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { useSelector } from "react-redux"

export function AddToyMsg({ toyId, saveToyMsg, toggleMsg }) {
    const inputRef = useRef()
    const [msg, setMsg] = useState(toyService.getEmptyMsg()) 
    const user = useSelector(storeState => storeState.userModule.loggedInUser)


    useEffect(() => {
        inputRef.current.focus()
    }, [])

    async function onAddToyMsg(ev) {
        ev.preventDefault()
        
        if (!msg.txt.trim()) {
            showErrorMsg('Message cannot be empty!')
            return
        }
        const toyMsgToSave = {
            id: msg.id,
            txt: msg.txt.trim(),
            by: {
                _id: user._id,
                fullname: user.fullname,
            },
            createdAt: msg.createdAt
        }
        try {
            await saveToyMsg(toyId, toyMsgToSave)
            showSuccessMsg('Message added successfully!')
            toggleMsg()
        } catch (err) {
            console.error('Failed to save message', err)
            showErrorMsg('Failed to save the message. Please try again.')
        }
    }

    function handleChange({ target }) {
        setMsg(prevMsg => ({ ...prevMsg, txt: target.value }))
    }

    return (
        <section className='msg-add'>
            <form onSubmit={onAddToyMsg} className='msg-form'>
                <div className='msg-modal'>
                    <h1>Add msg</h1>
                    <button
                        className='btn-toggle-modal'
                        onClick={toggleMsg}>
                        X
                    </button>
                    <label className='bold-txt' htmlFor='msg'>msg:</label>
                    <textarea
                        ref={inputRef}
                        placeholder='Enter your message here...'
                        name='msg'
                        id='msg'
                        value={msg.txt} 
                        onChange={handleChange}
                        rows='4'
                    />
                    <button>Save</button>
                </div>
            </form>
        </section>
    )
}
