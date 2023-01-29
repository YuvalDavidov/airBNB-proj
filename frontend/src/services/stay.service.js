import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'stayDB'
const BASE_URL = 'stay/'

export const stayService = {
  query,
  getById,
  save,
  remove,
  getEmptyStay,
  addStayMsg,
  getFilterFromSearchParams,
  getDefaultFilter,
  getStaysForWishlist
  // getDefaultHeaderFilter,
  // getDefaultLabelsFilter,
  // getDefaultModalFilter
}
// window.cs = stayService

async function query(filterBy = getDefaultFilter()) {
  if (filterBy?.hostId) return httpService.get(BASE_URL + `?hostId=${filterBy.hostId}`)
  if (filterBy?.wishlist) return httpService.get(BASE_URL)
  console.log('filterBy------->', filterBy)

  const queryParams = `?locationCountry=${filterBy.locationCountry}&locationCity=${filterBy.locationCity}&guests=${filterBy.guests}&label=${filterBy.label}&pets=${(+filterBy.pets > 0) ? 'true' : ''}`
  console.log('queryParams------->', queryParams)
  const stays = httpService.get(BASE_URL + queryParams)

  return stays
}

function getById(stayId) {
  return httpService.get(BASE_URL + stayId)
}

async function remove(stayId) {
  // throw new Error('Nope')
  await httpService.delete(BASE_URL, stayId)
}

async function save(stay) {
  let savedStay
  console.log(stay);
  if (stay._id) {
    savedStay = await httpService.put(BASE_URL + stay._id, stay)
  } else {
    // Later, owner is set by the backend
    stay.host = userService.getLoggedinUser()
    savedStay = await httpService.post(BASE_URL, stay)
  }
  return savedStay
}

async function getStaysForWishlist(staysIds) {
  const stays = await query({ wishlist: 'yes' })
  const filteredStays = stays.filter(stay => staysIds.includes(stay._id))
  return filteredStays
}

async function addStayMsg(stayId, txt) {
  // Later, this is all done by the backend
  const stay = await getById(stayId)
  if (!stay.msgs) stay.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  stay.msgs.push(msg)
  await storageService.put(STORAGE_KEY, stay)

  return msg
}

function getEmptyStay() {
  return {
    name: '',
    type: '',
    imgUrls: [],
    price: 0,
    summary: '',
    stayDetails: {
      guests: 0,
      bedrooms: 0,
      beds: 0,
      sharedBath: 0,
      allowPets: false,
    },
    amenities: [],
    labels: [],
    host: {},
    loc: {
      country: '',
      countryCode: '',
      city: '',
      address: '',
      lat: 0,
      lng: 0,
    },
    reviews: [],
  }
}



function getDefaultFilter() {
  return {
    locationCountry: '',
    locationCity: '',
    guests: 0,
    pets: 0,
    label: '',
    type: '',
    minPrice: 0,
    maxPrice: Infinity,
    amenities: '',
    startDate: false,
    endDate: false
  }
}

function getFilterFromSearchParams(searchParams) {
  const emptyFilter = getDefaultFilter()
  const filterBy = {}
  for (const field in emptyFilter) {
    filterBy[field] = searchParams.get(field) || ''
  }
  return filterBy
}

