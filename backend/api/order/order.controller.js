const orderService = require('./order.service.js')
const stayService = require('../stay/stay.service.js')

const logger = require('../../services/logger.service')


async function getOrders(req, res) {
    try {
        logger.debug('Getting Orders')
        const filterBy = {
            hostId: req.query.hostId || '',
            userId: req.query.userId || '',
        }
        const orders = await orderService.query(filterBy)
        res.json(orders)
    } catch (err) {
        logger.error('Failed to get orders', err)
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

async function addOrder(req, res) {
    try {
        const order = req.body
        const addedOrder = await orderService.add(order)
        res.json(addedOrder)
    } catch (err) {
        logger.error('Failed to add order', err)
        res.status(500).send({ err: 'Failed to add order' })
    }
}


module.exports = {
    getOrders,
    // getStayById,
    addOrder,
    // updateStay,
    // removeStay,
    // addStayMsg,
    // removeStayMsg
}
