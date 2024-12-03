
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {

            // Filter by name (txt)
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }

            // Filter by price
            if (filterBy.price) {
                toys = toys.filter(toy => toy.price <= filterBy.price)
            }

            // Filter by stock availability (isInStock)
            if (filterBy.isInStock !== '') {
                toys = toys.filter(toy =>
                    filterBy.isInStock === 'true' ? toy.inStock : !toy.inStock
                )
            }

            // Filter by labels (if there are selected labels)
            if (filterBy.labels && filterBy.labels.length > 0) {
                toys = toys.filter(toy =>
                    filterBy.labels.every(label => toy.labels.includes(label))
                )
            }

            // Sorting
            if (filterBy.sort) {
                if (filterBy.sort === 'txt') {
                    toys = toys.sort((a, b) => a.name.localeCompare(b.name))
                } else if (filterBy.sort === 'createdAt') {
                    toys = toys.sort((a, b) => a.createdAt - b.createdAt)
                } else if (filterBy.sort === 'price') {
                    toys = toys.sort((a, b) => a.price - b.price)
                }
            }

            return toys
        })
}


function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}
function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}
function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: 'Boy-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
        labels: ['Puzzle', 'Baby', 'Doll'],
        createdAt: Date.now(),
        inStock: true
    }
}

function getDefaultFilter() {
    return { txt: '', price: '', isInStock: '', label: '', sortBy: '' }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {name: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


