
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'stayDB'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    addStayMsg,
    getFilterFromSearchParams,
    getDefaultHeaderFilter,
    getDefaultLabelsFilter,
    getDefaultModalFilter
}
// window.cs = stayService


// async function query(filterBy = { txt: '', price: 0 }) {
async function query() {
    var stays = await storageService.query(STORAGE_KEY)
    return stays
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await storageService.put(STORAGE_KEY, stay)
    } else {
        // Later, owner is set by the backend
        stay.owner = userService.getLoggedinUser()
        savedStay = await storageService.post(STORAGE_KEY, stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    // Later, this is all done by the backend
    const stay = await getById(stayId)
    if (!stay.msgs) stay.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    stay.msgs.push(msg)
    await storageService.put(STORAGE_KEY, stay)

    return msg
}

function getEmptyStay() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}


function getDefaultModalFilter() {
    return {
        type: '',
        minPrice: 0,
        maxPrice: Infinity,
        amenities: '',
        capacity: Infinity
    }
}

function getDefaultLabelsFilter() {
    return {
        labels: []
    }
}

function getDefaultHeaderFilter() {
    return {
        locationCountry: '',
        locationCity: '',
        capacity: Infinity,
        name: ''

    }
}

function _getDefaultFilter() {
    return {
        locationCountry: '',
        locationCity: '',
        capacity: Infinity,
        name: '',
        labels: [],
        type: '',
        minPrice: 0,
        maxPrice: Infinity,
        amenities: '',
        capacity: Infinity
    }
}

function getFilterFromSearchParams(searchParams) {
    const emptyFilter = _getDefaultFilter()
    const filterBy = {}
    for (const field in emptyFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




