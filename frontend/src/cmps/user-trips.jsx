import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { loadOrders } from '../store/order.actions'
import { userService } from '../services/user.service'
import { utilService } from '../services/util.service'
import { UserTripsTr } from './user-trips-tr'

export function UserTrips() {
  const { orders } = useSelector((storeState) => storeState.orderModule)
  const { isMobile } = useSelector((storeState) => storeState.systemModule)

  useEffect(() => {
    loadOrders({ userId: userService.getLoggedinUser()._id })
  }, [])

  if (orders.length <= 0) return <div>you have no trips</div>

  return (
    <section className='user-trips'>
      <h1>Trips</h1>
      <h2>{orders.length} trips</h2>

      {!isMobile && <table className='trips-table'>
        <thead>
          <tr>
            <th style={{width: '350px'}}>Destination</th>
            <th>Host</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Booked</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order._id}>
                <td className="destination-td">
                  <img src={order.aboutOrder.stay.imgUrls[0]} alt='Stay img' />
                  <span>{order.aboutOrder.stay.name}</span>
                </td>
                <td className='host-td'>{order.aboutOrder.stay.host.fullname}</td>
                <td>{utilService.getFullDate(order.aboutOrder.startDate)}</td>
                <td>{utilService.getFullDate(order.aboutOrder.endDate)}</td>
                <td>{utilService.getFullDate(order.aboutOrder.bookDate)}</td>
                <td>${order.aboutOrder.totalPrice.toFixed(2)}</td>
                <td style={{fontFamily: 'Cereal-Medium', color: utilService.getStatusColor(order.aboutOrder.status)}}>{order.aboutOrder.status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>}

      {isMobile && <table className="mobile-trips-table">
        <thead>
            <tr>
                <th className='destination-th'>Destination</th>
                <th>Dates</th>
            </tr>
        </thead>
        <tbody>
            {orders.map(order => <UserTripsTr key={order._id} order={order} />)}
        </tbody>
        </table>}
    </section>
  )
}