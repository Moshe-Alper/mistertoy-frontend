import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'

export function ChatRoom({ toyId }) {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [topic, setTopic] = useState(toyId)
    const [isBotMode, setIsBotMode] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [typingUser, setTypingUser] = useState('')

    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

    const botTimeoutRef = useRef()
    const typingTimeoutRef = useRef()

    function handleInputChange(ev) {
        const { value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, txt: value }))

        socketService.emit('typing', { roomId: topic, user: { id: loggedInUser.id, username: loggedInUser.fullname }, typing: true })

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        typingTimeoutRef.current = setTimeout(() => {
            socketService.emit('stopped-typing', { roomId: topic, user: { id: loggedInUser.id, username: loggedInUser.fullname }, typing: false })
        }, 2000)
    }

    useEffect(() => {
        socketService.on('typing', (data) => {
            setTypingUser(data.username)
            setIsTyping(true)
        })

        socketService.on('stopped-typing', () => {
            setTypingUser('')
            setIsTyping(false)
        })

        return () => {
            socketService.off('typing')
            socketService.off('stopped-typing')
        }
    }, [])

    function sendBotResponse() {
        botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
        botTimeoutRef.current = setTimeout(() => {
            setMsgs(prevMsgs => [...prevMsgs, { from: 'Bot', txt: 'You are amazing!' }])
        }, 1250)
    }

    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedInUser?.fullname || 'Me'
        const newMsg = { from, txt: msg.txt }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        if (isBotMode) sendBotResponse()
        setMsg({ txt: '' })
    }

    useEffect(() => {
        setTopic(toyId)
    }, [toyId])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    }, [topic])

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
        }
    }, [])

    return (
        <section className="chat">
            <h2>Let's Chat about {topic}</h2>

            <label>
                <input type="checkbox" name="isBotMode" checked={isBotMode}
                    onChange={({ target }) => setIsBotMode(target.checked)} />
                Bot Mode
            </label>

            <form onSubmit={sendMsg}>
                <input
                    type="text" value={msg.txt} onChange={handleInputChange}
                    name="txt" autoComplete="off" />
                <button>Send</button>
            </form>

            <ul>
                {msgs.map((msg, idx) => (
                    <li key={idx}>
                        <strong>
                            {msg.from === loggedInUser?.fullname ? 'Me' : msg.from}
                        </strong>
                        : {msg.txt}
                    </li>
                ))}
            </ul>

            {isTyping && <p>{typingUser} is typing...</p>}
        </section>
    )
}
