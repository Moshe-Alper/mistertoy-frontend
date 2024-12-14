export function ToyMsgPreview({ toyId, msg, onRemoveToyMsg }) {
    return (
        <section className="msg-details">
            <h4>{msg.by.fullname}</h4>
            <p>{msg.txt}</p>
            <button className="btn-remove-toy-msg" onClick={() => onRemoveToyMsg(toyId, msg.id)}>x</button>
        </section>
    )
}