const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy = { txt: '' }) {
    try {
        let criteria
        if (filterBy.userId === 'undefined') filterBy.userId = undefined
        if (filterBy.hostId === 'undefined') filterBy.hostId = undefined

        if (filterBy.hostId) {
            criteria = {
                "aboutOrder.stay.host._id": { $regex: filterBy.hostId, $options: 'i' }
            }
        }

        if (filterBy.userId) {
            criteria = {
                "aboutUser._id": { $regex: filterBy.userId, $options: 'i' }
            }
        }

        const collection = await dbService.getCollection('order')
        var orders = await collection.find(criteria).toArray()
        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }
}

async function add(order) {
    try {
        const collection = await dbService.getCollection('order')
        await collection.insertOne(order)
        return order
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}

async function update(order) {
    try {
        const orderToSave = { ...order, aboutOrder: { ...order.aboutOrder, status: order.aboutOrder.status } }
        delete orderToSave._id
        const collection = await dbService.getCollection('order')
        await collection.updateOne({ _id: ObjectId(order._id) }, { $set: orderToSave })
        return orderToSave
    } catch (err) {
        logger.error('cannot update order', err)
        throw err
    }
}

module.exports = {
    // remove,
    query,
    // getById,
    add,
    update,
    // addStayMsg,
    // removeStayMsg
}
