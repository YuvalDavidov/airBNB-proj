export const SET_ORDERS = 'SET_ORDERS'





const initialState = {
    orders: [],

}


export function orderReducer(state = initialState, action) {
    let orders


    // orders
    switch (action.type) {
        case SET_ORDERS:
            return { ...state, orders: action.orders }

        default:
            return state
    }
}
