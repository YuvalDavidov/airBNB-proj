export const SET_STAYS = 'SET_STAYS'
export const REMOVE_STAY = 'REMOVE_STAY'
export const ADD_STAY = 'ADD_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'
export const SET_FILTER = 'SET_FILTER'
export const SET_HEADER_EXPAND = 'SET_HEADER_EXPAND'



const initialState = {
    stays: [],
    filterBy: null,
    isHeadFilterExpanded: false
}

export function stayReducer(state = initialState, action) {
    let stays

    // stays 
    switch (action.type) {
        case SET_STAYS:
            return { ...state, stays: action.stays }
        case REMOVE_STAY:
            stays = state.stays.filter(s => s._id !== action.stayId)
            return { ...state, stays }
        case ADD_STAY:
            stays = [...state.stays, action.stay]
            return {...state, stays}
        case UPDATE_STAY:
            stays = state.stays.map(stay => stay._id === action.stay._id ? action.stay : stay)
            return { ...state, stays }

        // filterBy
        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }


        // expanded
        case SET_HEADER_EXPAND:
            return { ...state, isFilterExpanded: action.toggle }
        default:
            return state
    }
}