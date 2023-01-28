const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { addOrder, getOrders, updateOrder } = require('./order.controller')
const router = express.Router()

router.get('/', getOrders)
router.post('/', addOrder) // requireAuth,
router.put('/', updateOrder) // requireAuth,

module.exports = router

