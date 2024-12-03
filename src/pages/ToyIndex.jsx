import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { LoaderWrapper } from '../cmps/LoaderWrapper.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, removeToyOptimistic, saveToy, setFilter} from '../store/actions/toy.actions.js'
import { SET_FILTER_BY } from '../store/reducers/toy.reducer.js'
import { ToySort } from '../cmps/ToySort.jsx'
import { PaginationButtons } from '../cmps/PaginationButtons.jsx'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const dispatch = useDispatch()
    // console.log('ToyIndex rendered', toys)

    useEffect(() => {
        // console.log('Loading toys')
        loadToys()
            .catch((err) => {
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    function setPageIdx(pageIdx) {
        setFilter({ pageIdx })
    }

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getEmptyToy()

        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`toy updated (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
            })
    }

    return (
        <div>
            <h3>Toys App</h3>
            <main>
                <button onClick={onAddToy}>Add Random toy ⛐</button>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <ToySort filterBy={filterBy} onSetFilter={onSetFilter} />
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