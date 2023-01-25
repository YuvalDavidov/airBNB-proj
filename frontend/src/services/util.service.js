export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    getFullDate,
    getStatusColor
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

randomLabels()

function randomLabels() {
    let labels = ['Trending', 'New', 'Beachfront', 'Cabins', 'Parks', 'Campers', 'Castles', 'Islands',
        'Boats', 'Home', 'Tropical', 'Towers', 'Windmills', 'Farms', 'Cave', 'Ski']
    let fourLabels = [labels[getRandomIntInclusive(0, 15)], labels[getRandomIntInclusive(0, 15)], labels[getRandomIntInclusive(0, 15)], labels[getRandomIntInclusive(0, 15)]]
    console.log(fourLabels)
    return fourLabels
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function getFullDate(date) {
    let day = new Date(date).getDate()
    let month = new Date(date).getMonth() + 1
    let year = new Date(date).getFullYear()

    return `${month}/${day}/${year}`
}

function getStatusColor(status) {
    switch (status) {
        case 'Approved':
            return 'green'
        case 'Rejected':
            return 'red'
        case 'Pending':
            return 'orange'
        default:
            return 'rgb(34,34,34)'
    }
}