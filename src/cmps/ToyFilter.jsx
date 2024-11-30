import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { LabelSelector } from "./LabelSelect.jsx"

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter))

    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

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
                value = target.checked
                break

            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onLabelChange(selectedLabels) {    
        setFilterByToEdit(prevFilter => ({
          ...prevFilter,
          labels: selectedLabels,
        }))
      }
    

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label htmlFor="price">Price:</label>
                <input type="number"
                    id="price"
                    name="price"
                    placeholder="By price"
                    value={filterByToEdit.price || ''}
                    onChange={handleChange}
                />

                <label htmlFor="isInStock">In Stock:</label>
                <select
                    id="isInStock"
                    name="isInStock"
                    value={filterByToEdit.isInStock}
                    onChange={handleChange}
                >
                    <option value="">All</option>
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                </select>

                <LabelSelector labels={labels} onLabelChange={onLabelChange} />

            </form>

        </section>
    )
}