const stayService = require('./stay.service.js')

const logger = require('../../services/logger.service')

async function getStays(req, res) {
  try {
    logger.debug('Getting Cars')
    const filterBy = {
      txt: req.query.txt || ''
    }
    const cars = await stayService.query(filterBy)
    res.json(cars)
  } catch (err) {
    logger.error('Failed to get cars', err)
    res.status(500).send({ err: 'Failed to get cars' })
  }
}

async function getStayById(req, res) {
  try {
    const carId = req.params.id
    const car = await stayService.getById(carId)
    res.json(car)
  } catch (err) {
    logger.error('Failed to get car', err)
    res.status(500).send({ err: 'Failed to get car' })
  }
}

async function addStay(req, res) {
  const { loggedinUser } = req

  try {
    const car = req.body
    car.owner = loggedinUser
    const addedCar = await stayService.add(car)
    res.json(addedCar)
  } catch (err) {
    logger.error('Failed to add car', err)
    res.status(500).send({ err: 'Failed to add car' })
  }
}

async function updateStay(req, res) {
  try {
    const car = req.body
    const updatedCar = await stayService.update(car)
    res.json(updatedCar)
  } catch (err) {
    logger.error('Failed to update car', err)
    res.status(500).send({ err: 'Failed to update car' })

  }
}

async function removeStay(req, res) {
  try {
    const carId = req.params.id
    const removedId = await stayService.remove(carId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove car', err)
    res.status(500).send({ err: 'Failed to remove car' })
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
