export function ToyMsgPreview({ msg }) {
    return (
        <section className="msg-details">
            <h4>{msg.by.fullname}</h4>
            <p>{msg.txt}</p>
        </section>
    )
}