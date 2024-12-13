import { useSelector } from 'react-redux'
import { ToyPreview } from "./ToyPreview.jsx"


export function ToyList({ toys, onRemoveToy, onEditToy }) {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div>
                        {user && user.isAdmin && (
                            <>
                                <button onClick={() => onRemoveToy(toy._id)}>x</button>
                                <button onClick={() => onEditToy(toy)}>Edit</button>
                            </>
                        )}
                    </div>
                </li>
            )}
        </ul>
    )
}