import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"

export function ToyPreview({ toy }) {
    const user = useSelector(state => state.userModule.loggedInUser)

    return (
        <article>
            <h4>{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>
                {toy.inStock
                    ? <span style={{ color: 'green' }}>In Stock</span>
                    : <span style={{ color: 'red' }}>Out of Stock</span>}
            </p>
            {user && user.isAdmin && toy.owner && (
                <p>Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>
            )}
            <hr />
            {user && user.isAdmin && (
                <Link to={`/toy/edit/${toy._id}`} style={{ marginInlineEnd: '10px' }}>Edit</Link>
            )}
            <Link to={`/toy/${toy._id}`}>Details</Link>
        </article>
    )
}