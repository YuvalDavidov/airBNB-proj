import { useState } from 'react'

import { setOrderStatus } from '../store/order.actions'
import { utilService } from '../services/util.service'
import { Link } from 'react-router-dom'

export function ReservationsTr({ order }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <tr className='top-tr' onClick={() => setIsOpen(!isOpen)}>
        <td className='destination-td'>{order.aboutOrder.stay.name}</td>

        {/* <td className='dates-td' style={{color: utilService.getStatusColor(order.aboutOrder.status)}}> */}
        <td className='dates-td'>
          {utilService.getFullDate(order.aboutOrder.startDate) +
            ' - ' +
            utilService.getFullDate(order.aboutOrder.endDate)}
        </td>
      </tr>
      {
        isOpen && (
          <tr className='bottom-tr'>
            <td>
              <div className='guest-info'>
                <div className="title">Guest</div><span>{order.aboutUser.fullname}</span>
              </div>
              <div className='price-info'>
                <div className="title">Total price</div>
                <span>
                  ${order.aboutOrder.totalPrice.toLocaleString('en-US')}
                </span>
              </div>
              <div className='location-info'>
                <div className="title">Location</div>
                <span>
                  {order.aboutOrder.stay.loc.city},{' '}
                  {order.aboutOrder.stay.loc.country}
                </span>
              </div>
            </td>

            <td>

              {/* <div className='status-info'>
              Status:{' '}
              <span
                style={{
                  fontFamily: 'Cereal-Medium',
                  color: utilService.getStatusColor(order.aboutOrder.status),
                }}
              >
                {order.aboutOrder.status}
              </span>
            </div> */}
              <div className='actions'>
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
                  <Link to={`/chat/${order.aboutUser.id}`}>
                    Chat with Guest
                  </Link>
                </button>
              </div>
            </td>
          </tr>
        )
      }
    </>
  )
}
