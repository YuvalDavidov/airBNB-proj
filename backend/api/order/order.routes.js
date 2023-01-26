const express = require('express')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const router = express.Router()

router.get('/', log, getOrders)
router.get('/:id', getOrderById)
router.post('/', addOrder) // requireAuth,
router.put('/:id', requireAuth, updateOrder)

module.exports = router