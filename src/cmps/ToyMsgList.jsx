import { ToyMsgPreview } from "./ToyMsgPreview"

export function ToyMsgList({ toyId, msgs, onRemoveToyMsg }) {

    return (
        <div>
            <h3>User msgs:</h3>
            {msgs.map(msg =>
                <ToyMsgPreview
                    key={msg.id}
                    toyId={toyId}
                    msg={msg}
                    onRemoveToyMsg={onRemoveToyMsg}
                />
            )}
        </div>
    )
}