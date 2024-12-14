import { ToyMsgPreview } from "./ToyMsgPreview"

export function ToyMsgList({ msgs }) {
    
    return (
        <div>
            <h3>User msgs:</h3>
            {msgs.map(msg =>
                <ToyMsgPreview
                    key={msg.id}
                    msg={msg}
                />
            )}
        </div>
    )
}