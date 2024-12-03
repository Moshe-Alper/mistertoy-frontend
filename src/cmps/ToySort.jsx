import { useEffect, useState } from 'react'

export function ToySort({ filterBy, onSetFilter }) {

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        
        onSetFilter(prevFilter => ({
            ...prevFilter,
            sortBy: {
                ...prevFilter.sortBy,
                [field]: field === 'desc' ? -prevFilter.sortBy.desc : value,
            },
        }))
    }
    const sortBy = filterBy.sortBy
    console.log('sortBy:', sortBy)
    return (
        <div className="sort-container">
            <select name="type" value={sortBy.type} onChange={handleChange}>
                <option value="">Sort by</option>
                <option value="txt">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">Date</option>
            </select>
            <label>
                <input
                    type="checkbox"
                    name="desc"
                    checked={sortBy.desc < 0}
                    onChange={handleChange}
                />
                Descending
            </label>
        </div>
    )
}
