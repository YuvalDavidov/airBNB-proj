import { stayService } from "../services/stay.service.local"
import { store } from "./store"
import { SET_STAYS, ADD_STAY, REMOVE_STAY, UPDATE_STAY, SET_FILTER, SET_HEADER_EXPAND } from "./stay.reducer"

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

export async function loadStays(filterBy) {
    try {
        const stays = await stayService.query(filterBy)
        console.log('Stays from DB:', stays)
        store.dispatch({
            type: SET_STAYS,
            stays
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
