import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'orderDB'

export const orderService = {
    query,
    getById,
    save,
    remove,
    addStayMsg,
    getEmptyOrder
    // getDefaultHeaderFilter,
    // getDefaultLabelsFilter,
    // getDefaultModalFilter
}


async function query(filterBy) {
    var orders = await storageService.query(STORAGE_KEY)

    if (filterBy?.hostId) {
        orders = orders.filter(order => order.aboutOrder.stay.host._id === filterBy.hostId)
    }
    if (filterBy?.userId) {
        orders = orders.filter(order => order.aboutUser.id === filterBy.userId)
    }
    return orders
}

function getById(orderId) {
    return storageService.get(STORAGE_KEY, orderId)
}

async function remove(orderId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, orderId)
}

async function save(order) {
    console.log(order);
    var savedOrder
    if (order._id) {
        savedOrder = await storageService.put(STORAGE_KEY, order)
    } else {
        // Later, owner is set by the backend
        // stay.owner = userService.getLoggedinUser()
        savedOrder = await storageService.post(STORAGE_KEY, order)
    }
    return savedOrder
}

async function addStayMsg(stayId, txt) {
    // Later, this is all done by the backend
    const stay = await getById(stayId)
    if (!stay.msgs) stay.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt,
    }
    stay.msgs.push(msg)
    await storageService.put(STORAGE_KEY, stay)

    return msg
}

function getEmptyOrder() {
    return {
        aboutUser: {},
        aboutOrder: {}
    }
}

