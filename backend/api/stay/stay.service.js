const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = { locationCity: '' }) {
    try {
        const criteria = _buildCriteria(filterBy)
        console.log(criteria);
        const collection = await dbService.getCollection('stay')
        let stays = await collection.find(criteria).toArray()

        return stays
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }
}

async function getById(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        const stay = collection.findOne({ _id: ObjectId(stayId) })
        return stay
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err)
        throw err
    }
}

async function remove(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.deleteOne({ _id: ObjectId(stayId) })
        return stayId
    } catch (err) {
        logger.error(`cannot remove stay ${stayId}`, err)
        throw err
    }
}

async function add(stay) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.insertOne(stay)
        return stay
    } catch (err) {
        logger.error('cannot insert stay', err)
        throw err
    }
}

async function update(stay) {
    try {
        const stayToSave = {
            vendor: stay.vendor,
            price: stay.price
        }
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: ObjectId(stay._id) }, { $set: stayToSave })
        return stay
    } catch (err) {
        logger.error(`cannot update stay ${stayId}`, err)
        throw err
    }
}

async function addStayMsg(stayId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: ObjectId(stayId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add stay msg ${stayId}`, err)
        throw err
    }
}

async function removeStayMsg(stayId, msgId) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: ObjectId(stayId) }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        logger.error(`cannot add stay msg ${stayId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy = {}) {
    let criteria = {}
    if (filterBy?.locationCity) criteria['loc.city'] = { $regex: filterBy.locationCity, $options: 'i' }
    if (filterBy?.locationCountry) criteria['loc.country'] = filterBy.locationCountry
    if (filterBy?.guests) criteria['stayDetails.guests'] = { $gte: +filterBy.guests } // its a number! 
    if (filterBy?.label !== 'Trending') criteria['labels'] = { $all: [filterBy.label] }
    return criteria
}

// if (filterBy?.locationCity) stays = stays.filter(stay => stay.loc.city === filterBy.locationCity)
// if (filterBy?.locationCountry) stays = stays.filter(stay => stay.loc.country === filterBy.locationCountry)
// if (filterBy?.guests) stays = stays.filter(stay => stay.stayDetails.guests >= filterBy.guests)
// if (filterBy?.label === 'Trending') return stays
// if (filterBy?.label) stays = stays.filter(stay => stay.labels.includes(filterBy.label))

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addStayMsg,
    removeStayMsg
}
