import { store } from './store'
import { orderService } from '../services/order.service'
import { SET_ORDERS, UPDATE_ORDER } from './order.reducer'



export async function loadOrders(filterBy) {
    try {
        const orders = await orderService.query(filterBy)
        console.log('Stays from DB:', orders)
        store.dispatch({
            type: SET_ORDERS,
            orders,
        })
    } catch (err) {
        console.log('Cannot load orders', err)
        throw err
    }
}

export async function setOrderStatus(order, status) {
    try {
        order.aboutOrder.status = status
        const savedOrder = await orderService.save(order)
        store.dispatch({type: UPDATE_ORDER, order: savedOrder})
    } catch (err) {
        console.log('Cannot save order', err)
        throw err
    }
}