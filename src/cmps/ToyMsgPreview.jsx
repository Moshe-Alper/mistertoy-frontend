export function ToyMsgPreview({ toyId, msg, onRemoveToyMsg }) {
    return (
        <section className="msg-details">
            <h4>{msg.by.fullname}</h4>
            <pre>{msg.txt}</pre>
            <button className="btn-remove-toy-msg" onClick={() => onRemoveToyMsg(toyId, msg.id)}>x</button>
        </section>
    )
}