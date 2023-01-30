import { stayService } from '../services/stay.service'
import { store } from './store'
import {
  SET_STAYS,
  ADD_STAY,
  REMOVE_STAY,
  UPDATE_STAY,
  SET_FILTER,
  SET_HEADER_EXPAND,
  SET_WISHLIST_STAYS,
  SET_MY_STAYS,
  SET_HEADER_IN_DETAILS,
  SET_LOCATIONS

} from './stay.reducer'



export function getActionRemoveStay(stayId) {
  return {
    type: REMOVE_STAY,
    stayId,
  }
}
export function getActionAddStay(stay) {
  return {
    type: ADD_STAY,
    stay,
  }
}
export function getActionUpdateStay(stay) {
  return {
    type: UPDATE_STAY,
    stay,
  }
}

export function setFilterBy(filterBy) {
  store.dispatch({ type: SET_FILTER, filterBy })
}

export function toggleExpand(boolean) {
  store.dispatch({ type: SET_HEADER_EXPAND, toggle: boolean })
}

export function toggleInDetails(boolean) {
  store.dispatch({ type: SET_HEADER_IN_DETAILS, toggle: boolean })
}

export async function loadStays(filterBy) {
  try {
    const stays = await stayService.query(filterBy)
    // console.log('Stays from DB:', stays)
    store.dispatch({
      type: SET_STAYS,
      stays,
    })
  } catch (err) {
    console.log('Cannot load stays', err)
    throw err
  }
}

export async function loadLocations() {
  let locations
  try {
    let stays = await stayService.query()
    let uniqueCities = [...new Set(stays.map(stay => { return stay.loc.city }))]
    locations = uniqueCities.map(city => {
      let filteredStays = stays.filter(stay => { if (stay.loc.city === city) return stay.loc.country })
      return {
        city, country: filteredStays[0].loc.country
      }
    })
    store.dispatch({
      type: SET_LOCATIONS,
      locations,
    })
  }
  catch (err) {
    console.error('couldnt load locations')
  }
}

export async function loadMyStays(filterBy) {
  try {
    const stays = await stayService.query(filterBy)
    // console.log('Stays from DB:', stays)
    store.dispatch({
      type: SET_MY_STAYS,
      stays,
    })
  } catch (err) {
    console.log('Cannot load stays', err)
    throw err
  }
}

export async function removeStay(stayId) {
  try {
    await stayService.remove(stayId)
    store.dispatch(getActionRemoveStay(stayId))
  } catch (err) {
    console.log('Cannot remove stay', err)
    throw err
  }
}

// export async function addStay(stay) {
//   try {
//     const savedStay = await stayService.save(stay)
//     console.log('Added Stay', savedStay)
//     store.dispatch(getActionAddStay(savedStay))
//     return savedStay
//   } catch (err) {
//     console.log('Cannot add stay', err)
//     throw err
//   }
// }

// export async function updateStay(stay) {
//   return stayService
//     .save(stay)
//     .then((savedStay) => {
//       console.log('Updated Stay:', savedStay)
//       store.dispatch(getActionUpdateStay(savedStay))
//       return savedStay
//     })
//     .catch((err) => {
//       console.log('Cannot save stay', err)
//       throw err
//     })
// }

export async function saveStay(stay) {
  try {
    const savedStay = await stayService.save(stay)
    const getActionSaveStay = stay._id ? getActionUpdateStay : getActionAddStay
    store.dispatch(getActionSaveStay(savedStay))
    return savedStay
  } catch (err) {
    console.log('Cannot save stay', err)
    throw err
  }
}

export async function getStaysForWishlist(staysIds) {
  try {
    const wishlistStays = await stayService.getStaysForWishlist(staysIds)
    store.dispatch({ type: SET_WISHLIST_STAYS, wishlistStays })
    return wishlistStays
  } catch (err) {
    console.log('cannot set wishlist stays')
    throw err
  }
}
