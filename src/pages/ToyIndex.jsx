import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { LoaderWrapper } from '../cmps/LoaderWrapper.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToyOptimistic, saveToy, setFilter } from '../store/actions/toy.actions.js'
import { ToySort } from '../cmps/ToySort.jsx'
import { PaginationButtons } from '../cmps/PaginationButtons.jsx'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        (async () => {
            try {
                // console.log('Loading Toys...')
                await loadToys()
            } catch (err) {
                showErrorMsg('Cannot load toys')
            }
        })()
    }, [filterBy])

    async function onRemoveToy(toyId) {
        try {
            await removeToyOptimistic(toyId)
            showSuccessMsg('Toy removed')

        } catch (err) {
            showErrorMsg('Cannot remove toy')

        }
    }

    async function onAddToy() {
        const toyToSave = toyService.getEmptyToy()

        try {
            const savedToy = await saveToy(toyToSave)
            showSuccessMsg(`Toy added (id: ${savedToy._id})`)
        } catch (err) {
            showErrorMsg('Cannot add toy')
        }
    }

    async function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }
        try {
            const savedToy = await saveToy(toyToSave)
            showSuccessMsg(`Toy updated (id: ${savedToy._id})`)
        } catch (err) {
            showErrorMsg('Cannot update toy')
        }
    }

    function onSetFilter(filterBy) {
        setFilter({ ...filterBy, pageIdx: 0 })
    }

    function onSetSort(sortBy) {
        setFilter({ ...filterBy, sortBy: { ...sortBy } })
    }

    function setPageIdx(pageIdx) {
        setFilter({ pageIdx })
    }

    return (
        <div>
            <h3>Toys App</h3>
            <main>
                {user && user.isAdmin && (
                    <button onClick={onAddToy}>Add Random toy ⛐</button>
                )}                
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <ToySort sortBy={filterBy.sortBy} onSetSort={onSetSort} />
                <LoaderWrapper isLoading={isLoading}>
                    <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                    />
                </LoaderWrapper>
                <PaginationButtons
                    pageIdx={filterBy.pageIdx}
                    setPageIdx={setPageIdx}
                    toysLength={toys.length}
                />
            </main>
        </div>
    )

}