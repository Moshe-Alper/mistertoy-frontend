export function ToySort({ sortBy, onSetSort }) {

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value

        const newSortBy = { ...sortBy, [field]: field === 'desc' ? -sortBy.desc : value }
        onSetSort(newSortBy)
    }

    return (
        <div className="sort-container main-layout">
            <select name="type" value={sortBy.type || ''} onChange={handleChange}>
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
