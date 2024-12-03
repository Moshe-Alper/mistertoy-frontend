import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}
function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}
function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        toy.owner = userService.getLoggedinUser()
        return httpService.post(BASE_URL, toy)
    }
}

function getEmptyToy() {
    return {
        name: 'Toy-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(10, 90),
        labels: _getRandomLabels(),
        createdAt: Date.now(),
        inStock:  Math.random() < 0.5 
    }
}

function getDefaultFilter() {
    return { txt: '', price: '', isInStock: '', label: '', pageIdx: 0, sortBy: {type: '', desc: 1} }
}

function _getRandomLabels() {
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
    const shuffled = labels.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 3) 
}

// TEST DATA
// storageService.post(STORAGE_KEY, {name: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


