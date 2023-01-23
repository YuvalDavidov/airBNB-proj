export const SET_ORDERS = 'SET_ORDERS'
export const UPDATE_ORDER = 'UPDATE_ORDER'




const initialState = {
    orders: [],

}


export function orderReducer(state = initialState, action) {
    let orders


    // orders
    switch (action.type) {
        case SET_ORDERS:
            return { ...state, orders: action.orders }
        case UPDATE_ORDER:
            orders = state.orders.map(order => order._id === action.order._id ? action.order : order)
            return {...state, orders}

        default:
            return state
    }
}
