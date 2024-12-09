import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { Link, useNavigate, useParams } from "react-router-dom"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            navigate('/toy')
        }
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Toy name : {toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <p>
                {toy.inStock
                    ? <span style={{ color: 'green' }}>In Stock</span>
                    : <span style={{ color: 'red' }}>Out of Stock</span>}
            </p>
            {toy.labels && toy.labels.length > 0 && (
                <p>Labels: {toy.labels.join(", ")}</p>
            )}
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/toy`}>Back</Link>
        </section>
    )
}