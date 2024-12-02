import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"


export function ToySort({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked ? -1 : 1
                setFilterByToEdit(prevFilter => ({
                    ...prevFilter,
                    sortBy: { ...prevFilter.sortBy, desc: value }
                }))
                return 
            default:
                break
        }

        setFilterByToEdit(prevFilter => ({
            ...prevFilter,
            sortBy: { ...prevFilter.sortBy, [field]: value }
        }))
    }



    return (
        <div className="sort-container">
            <select
                value={filterByToEdit.sortBy.type}
                name="type"
                onChange={handleChange}
                id="sort"
            >
                <option value="">Sort By</option>
                <option value="txt">Name</option>
                <option value="createdAt">Date</option>
                <option value="price">Price</option>
            </select>
            <label>
                <input
                    type="checkbox"
                    name="desc"
                    checked={filterByToEdit.sortBy.desc < 0}
                    onChange={handleChange}
                />
                Descending
            </label>
        </div>
    )
}
