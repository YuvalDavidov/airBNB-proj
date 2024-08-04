import { store } from './store'
import { orderService } from '../services/order.service'
import { SET_ORDERS, UPDATE_ORDER, SET_HOST_ORDERS } from './order.reducer'



export async function loadOrders(filterBy) {
    try {
        const orders = await orderService.query(filterBy)
        store.dispatch({
            type: SET_ORDERS,
            orders,
        })
    } catch (err) {
        throw err
    }
}

export async function loadHostOrders(filterBy) {
    try {
        const hostOrders = await orderService.query(filterBy)
        store.dispatch({
            type: SET_HOST_ORDERS,
            hostOrders,
        })
    } catch (err) {
        throw err
    }
}

export async function setOrderStatus(order, status) {
    try {
        order.aboutOrder.status = status
        const savedOrder = await orderService.save(order)
        store.dispatch({ type: UPDATE_ORDER, order: savedOrder })

    } catch (err) {
        throw err
    }
}