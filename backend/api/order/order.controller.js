const orderService = require('./order.service.js')

const logger = require('../../services/logger.service')

async function getStays(req, res) {
  try {
    logger.debug('Getting Stays')
    const filterBy = {
      txt: req.query.txt || ''
    }
    const stays = await stayService.query(filterBy)
    res.json(stays)
  } catch (err) {
    logger.error('Failed to get stays', err)
    res.status(500).send({ err: 'Failed to get stays' })
  }
}

async function getStayById(req, res) {
  try {
    logger.debug('Getting Stay')
    const stayId = req.params.id
    const stay = await stayService.getById(stayId)
    console.log(stay);
    res.json(stay)
  } catch (err) {
    logger.error('Failed to get stay', err)
    res.status(500).send({ err: 'Failed to get stay' })
  }
}

async function addStay(req, res) {
  try {
    const stay = req.body
    const addedStay = await stayService.add(stay)
    res.json(addedStay)
  } catch (err) {
    logger.error('Failed to add stay', err)
    res.status(500).send({ err: 'Failed to add stay' })
  }
}

async function updateStay(req, res) {
  try {
    const stay = req.body
    const updatedStay = await stayService.update(stay)
    res.json(updatedStay)
  } catch (err) {
    logger.error('Failed to update stay', err)
    res.status(500).send({ err: 'Failed to update stay' })

  }
}
