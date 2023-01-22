import { store } from './store'
import { orderService } from '../services/order.service'
import { SET_ORDERS } from './order.reducer'



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