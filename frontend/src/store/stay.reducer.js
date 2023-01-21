import { stayService } from "../services/stay.service.local"
export const SET_STAYS = 'SET_STAYS'
export const REMOVE_STAY = 'REMOVE_STAY'
export const ADD_STAY = 'ADD_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'
export const SET_FILTER = 'SET_FILTER'
export const SET_HEADER_EXPAND = 'SET_HEADER_EXPAND'
export const SET_WISHLIST_STAYS = 'SET_WISHLIST_STAYS'
export const SET_MY_STAYS = 'SET_MY_STAYS'

const initialState = {
  stays: [],
  myStays: [],
  filterBy: null,
  isHeadFilterExpanded: false,
}

export function stayReducer(state = initialState, action) {
  let stays
  let mySortedStays

  // stays
  switch (action.type) {
    case SET_STAYS:
      return { ...state, stays: action.stays }
    case REMOVE_STAY:
      stays = state.stays.filter((s) => s._id !== action.stayId)
      return { ...state, stays }
    case ADD_STAY:
      stays = [...state.stays, action.stay]
      return { ...state, stays }
    case UPDATE_STAY:
      stays = state.stays.map((stay) =>
        stay._id === action.stay._id ? action.stay : stay
      )
      return { ...state, stays }
    case SET_WISHLIST_STAYS:
      return { ...state, staysForWishlist: action.wishlistStays }

    // filterBy
    case SET_FILTER:
      return { ...state, filterBy: action.filterBy }

    // expanded
    case SET_HEADER_EXPAND:
      return { ...state, isHeadFilterExpanded: action.toggle }

    // dashboard stays
    case SET_MY_STAYS:
      return { ...state, myStays: action.stays }


    default:
      return state
  }
}


function _compareNumbers(a, b) {
  return a - b;
}
