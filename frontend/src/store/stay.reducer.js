import { stayService } from "../services/stay.service.local"
export const SET_STAYS = 'SET_STAYS'
export const REMOVE_STAY = 'REMOVE_STAY'
export const ADD_STAY = 'ADD_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'
export const SET_FILTER = 'SET_FILTER'
export const SET_HEADER_EXPAND = 'SET_HEADER_EXPAND'
export const SET_WISHLIST_STAYS = 'SET_WISHLIST_STAYS'
export const SET_MY_STAYS = 'SET_MY_STAYS'
export const SET_HEADER_IN_DETAILS = 'SET_HEADER_IN_DETAILS'
export const SET_LOCATIONS = 'SET_LOCATIONS'

const initialState = {
  stays: [],
  locations: [],
  myStays: [],
  staysForWishlist: [],
  filterBy: stayService.getDefaultFilter(),
  isHeadFilterExpanded: false,
  isStayDetails: false
}

export function stayReducer(state = initialState, action) {
  let stays

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

    // in details
    case SET_HEADER_IN_DETAILS:

      return { ...state, isStayDetails: action.toggle }

    // dashboard stays
    case SET_MY_STAYS:
      return { ...state, myStays: action.stays }

    // locations for filter

    case SET_LOCATIONS:
      return { ...state, locations: action.locations }


    default:
      return state
  }
}
