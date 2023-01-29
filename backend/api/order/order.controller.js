const orderService = require('./order.service.js')
const socketService = require('../../services/socket.service.js')

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
        console.log('userId from addOrder', order.aboutOrder.stay.host._id)
        socketService.emitToUser({ type: 'recieved-order', data: order, userId: order.aboutOrder.stay.host._id })
        res.json(addedOrder)
    } catch (err) {
        logger.error('Failed to add order', err)
        res.status(500).send({ err: 'Failed to add order' })
    }
}

async function updateOrder(req, res) {
    try {
        const order = req.body
        const updatedOrder = await orderService.update(order)
        console.log('order from updateorder', order)
        socketService.emitToUser({ type: 'reviewed-order', data: order, userId: order.aboutUser._id })
        res.json(updatedOrder)
    } catch (err) {
        logger.error('Failed to update order', err)
        res.status(500).send({ err: 'Failed to update order' })
    }
}


module.exports = {
    getOrders,
    // getStayById,
    addOrder,
    updateOrder,
    // removeStay,
    // addStayMsg,
    // removeStayMsg
}
