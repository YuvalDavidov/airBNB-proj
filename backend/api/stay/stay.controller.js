const stayService = require('./stay.service.js')
const logger = require('../../services/logger.service')

async function getStays(req, res) {
  let filterBy
  try {
    logger.debug('Getting Stays.....')

    filterBy = {
      locationCountry: req.query.locationCountry || '',
      locationCity: req.query.locationCity || '',
      guests: req.query.guests || 0,
      label: req.query.label || 'Trending'
    }
    if (req.query.pets) filterBy.pets = true
    console.log('filterBy------->', filterBy)
    if (req.query.hostId) {
      filterBy = {
        hostId: req.query.hostId
      }
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

async function removeStay(req, res) {
  try {
    const stayId = req.body.id
    const removedId = await stayService.remove(stayId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove stay', err)
    res.status(500).send({ err: 'Failed to remove stay' })
  }
}

async function addStayMsg(req, res) {
  const { loggedinUser } = req
  try {
    const carId = req.params.id
    const msg = {
      txt: req.body.txt,
      by: loggedinUser
    }
    const savedMsg = await stayService.addCarMsg(carId, msg)
    res.json(savedMsg)
  } catch (err) {
    logger.error('Failed to update car', err)
    res.status(500).send({ err: 'Failed to update car' })

  }
}

async function removeStayMsg(req, res) {
  const { loggedinUser } = req
  try {
    const carId = req.params.id
    const { msgId } = req.params

    const removedId = await stayService.removeCarMsg(carId, msgId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove car msg', err)
    res.status(500).send({ err: 'Failed to remove car msg' })

  }
}

module.exports = {
  getStays,
  getStayById,
  addStay,
  updateStay,
  removeStay,
  addStayMsg,
  removeStayMsg
}
