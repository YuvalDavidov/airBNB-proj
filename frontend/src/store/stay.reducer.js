export const SET_STAYS = 'SET_STAYS'
export const REMOVE_STAY = 'REMOVE_STAY'
export const ADD_STAY = 'ADD_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'

const initialState = {
    stays: []
}

export function stayReducer(state = initialState, action) {
    var stays
    switch (action.type) {
        case SET_STAYS:
            return {...state, stays: action.stays}
        case REMOVE_STAY:
            stays = state.stays.filter(s => s._id !== action.stayId)
            return {...state, stays}
        case ADD_STAY:
            stays = [...state, action.stay]
            return {...state, stays}
        case UPDATE_STAY:
            stays = state.stays.map(stay => stay._id === action.stay._id ? action.stay : stay)
            return {...state, stays}

        default:
            return state
    }
}