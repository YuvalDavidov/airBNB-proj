import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { userService } from '../services/user.service'
import { utilService } from '../services/util.service'
import { socketService } from '../services/socket.service'
import { loadOrders, setOrderStatus } from '../store/order.actions'

import { ListingChart } from './listing-chart'
import { ReservBarChart } from './reservations-bar-chart'
import { ReservationsTr } from './reservations-tr'
import { Link } from 'react-router-dom'

export function Reservations() {
  // const [orders, setOrders] = useState(null)
  const { user } = useSelector((storeState) => storeState.userModule)
  const { orders } = useSelector((storeState) => storeState.orderModule)
  const { isMobile } = useSelector((storeState) => storeState.systemModule)

  useEffect(() => {
    loadOrders({ hostId: userService.getLoggedinUser()._id })
    socketService.on('recieved-order', addedOrder => {
      loadOrders({ hostId: userService.getLoggedinUser()._id })
    })
  }, [])



  return (
    <section className='reservations'>
      <section className='charts'>

        <div className='listing'>
          <h2>Reservations status</h2>
          <div className='reservations-status'>
            <div className='status-info'>
              <span className='status-name'>Pending</span>
              <span className='status-count pending'>
                {
                  orders.filter(
                    (order) => order.aboutOrder.status === 'Pending'
                  ).length
                }
              </span>
            </div>
            <div className='status-info'>
              <span className='status-name'>Approved</span>
              <span className='status-count approved'>
                {
                  orders.filter(
                    (order) => order.aboutOrder.status === 'Approved'
                  ).length
                }
              </span>
            </div>
            <div className='status-info'>
              <span className='status-name'>Rejected</span>
              <span className='status-count rejected'>
                {
                  orders.filter(
                    (order) => order.aboutOrder.status === 'Rejected'
                  ).length
                }
              </span>
            </div>
          </div>
        </div>

        <div className='listing'>
          <h2>Revenue / month</h2>
          <div className='bar-chart'>
            <ReservBarChart orders={orders} />
          </div>
        </div>

        <div className='listing'>
          <h2>Reservations / listing</h2>
          <div className='dougnut-chart'>
            <ListingChart orders={orders} />
          </div>
        </div>
      </section>

      {!isMobile && <table className='reservation-table'>
        <tbody>
          <tr>
            <th>Guest</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Booked</th>
            <th>Listing</th>
            <th>Total Payout</th>
            <th className='status-td'>Status</th>
            <th className='todo-td'>To do</th>
          </tr>
          {orders.sort((a, b) => (a.aboutOrder.bookDate - b.aboutOrder.bookDate) * -1).map((order) => {
            return (
              <tr key={order._id} className='data'>
                <td className='guest-td'>
                  <img
                    src={order.aboutUser.imgUrl}
                    className='mini-img'
                    alt=''
                  />{' '}
                  {order.aboutUser.fullname}
                </td>
                <td>{utilService.getFullDate(order.aboutOrder.startDate)}</td>
                <td>{utilService.getFullDate(order.aboutOrder.endDate)}</td>
                <td>{utilService.getFullDate(order.aboutOrder.bookDate)}</td>
                <td>{order.aboutOrder.stay.name}</td>
                <td>${order.aboutOrder.totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                <td
                  style={{
                    fontFamily: 'Cereal-Medium',
                    color: utilService.getStatusColor(order.aboutOrder.status),
                  }}
                >
                  {order.aboutOrder.status}
                </td>
                <td>
                  <button
                    className={
                      order.aboutOrder.status === 'Approved'
                        ? 'approve-btn is-active'
                        : 'approve-btn'
                    }
                    onClick={() => setOrderStatus(order, 'Approved')}
                  >
                    Approve
                  </button>
                  <button
                    className={
                      order.aboutOrder.status === 'Rejected'
                        ? 'reject-btn is-active'
                        : 'reject-btn'
                    }
                    onClick={() => setOrderStatus(order, 'Rejected')}
                  >
                    Reject
                  </button>
                  <button>
                    <Link to={`/chat/${order.aboutUser._id}`}>
                      Chat with Guest
                    </Link>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>}

      {isMobile && <div className="mobile-reservations">
        {orders.filter(order => order.aboutOrder.status === 'Pending').length > 0 &&
          <>
            <h2 style={{ marginBottom: '25px' }}>Pending</h2>
            <table className="mobile-reservations-table">
              <thead>
                <tr>
                  <th className='listing-th'>Listing</th>
                  <th className='dates-th'>Dates</th>
                </tr>
              </thead>
              <tbody>
                {orders.filter(order => order.aboutOrder.status === 'Pending').sort((a, b) => (a.aboutOrder.bookDate - b.aboutOrder.bookDate) * -1).map(order => <ReservationsTr key={order._id} order={order} />)}

              </tbody>
            </table>
          </>}
        <div className="approved-status" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '25px' }}>
          <h2>Approved</h2>
          <h4 style={{ color: 'green' }}>Total revenue: ${orders.filter(order => order.aboutOrder.status === 'Approved').reduce((acc, order) => {
            acc += order.aboutOrder.totalPrice
            return acc
          }, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</h4>
        </div>
        <table className="mobile-reservations-table">
          <thead>
            <tr>
              <th className='listing-th'>Listing</th>
              <th className='dates-th'>Dates</th>
            </tr>
          </thead>
          <tbody>
            {orders.filter(order => order.aboutOrder.status === 'Approved').sort((a, b) => (a.aboutOrder.bookDate - b.aboutOrder.bookDate) * -1).map(order => <ReservationsTr key={order._id} order={order} />)}
          </tbody>
        </table>
      </div>}
    </section>
  )
}
