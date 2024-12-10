import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { faker } from '@faker-js/faker'


const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getPricePerLabelData,
    getInventoryByLabelData,
    generateFakerData,
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
        inStock: Math.random() < 0.5
    }
}

function getDefaultFilter() {
    return { txt: '', price: '', isInStock: '', labels: [], pageIdx: 0, sortBy: { type: '', desc: 1 } }
}

function _getRandomLabels() {
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
    const shuffled = labels.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 3)
}


function getPricePerLabelData(toys) {
    const labelMap = {}
    toys.forEach(toy => {
        toy.labels.forEach(label => {
            if (!labelMap[label]) labelMap[label] = 0
            labelMap[label] += toy.price
        })
    })
    return _getPricePerLabelMap(labelMap)
}


function getInventoryByLabelData(toys) {
    const labelMap = {}

    toys.forEach(toy => {
        toy.labels.forEach(label => {
            if (!labelMap[label]) labelMap[label] = { inStock: 0, total: 0 }
            labelMap[label].total++
            if (toy.inStock) labelMap[label].inStock++
        })
    })
    
    return _getInventoryByLabelMap(labelMap)
}

function generateFakerData() {
    const labels = Array.from({ length: 7 }, () => faker.date.month())

    const datasets = [
        {
            label: faker.commerce.productName(), 
            data: Array.from({ length: labels.length }, () => faker.number.int({ min: -1000, max: 2000 })),
            borderColor: faker.color.rgb(),
            backgroundColor: faker.color.rgb({ alpha: 0.5 }),
        },
        {
            label: faker.commerce.productName(),
            data: Array.from({ length: labels.length }, () => faker.number.int({ min: -1000, max: 2000 })),
            borderColor: faker.color.rgb(),
            backgroundColor: faker.color.rgb({ alpha: 0.5 }),
        },
    ]

    return { labels, datasets };
}


// Private functions

function _getPricePerLabelMap(labelMap) {
    return Object.entries(labelMap).map(([label, total]) => ({ label, total }))
}

function _getInventoryByLabelMap(labelMap) {
    return Object.entries(labelMap).map(([label, { inStock, total }]) => ({
        label,
        inStockPercentage: ((inStock / total) * 100).toFixed(2),
    }))
}




