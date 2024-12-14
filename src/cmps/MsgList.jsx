import { MsgPreview } from "./MsgPreview"

export function MsgList({ msgs }) {
    console.log('msgs:', msgs)
    return (
        <div>
            <h3>User msgs:</h3>
            {msgs.map(msg =>
                <MsgPreview
                    key={msg.id}
                    msg={msg}
                />
            )}
        </div>
    )
}