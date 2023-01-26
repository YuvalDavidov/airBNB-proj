import { useState } from 'react'

import { setOrderStatus } from '../store/order.actions'
import { utilService } from '../services/util.service'

export function ReservationsTr({ order }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <tr className='top-tr' onClick={() => setIsOpen(!isOpen)}>
        <td className='destination-td'>{order.aboutOrder.stay.name}</td>
        <td className='dates-td'>
          {utilService.getFullDate(order.aboutOrder.startDate) +
            ' - ' +
            utilService.getFullDate(order.aboutOrder.endDate)}
        </td>
      </tr>
      {isOpen && (
        <tr className='bottom-tr'>
          <td>
            <div className='host-info'>
              Guest: <span>{order.aboutOrder.stay.host.fullname}</span>
            </div>
            <div className='price-info'>
              Total price:{' '}
              <span>
                ${order.aboutOrder.totalPrice.toLocaleString('en-US')}
              </span>
            </div>
            <div className='location-info'>
              Location:{' '}
              <span>
                {order.aboutOrder.stay.loc.city},{' '}
                {order.aboutOrder.stay.loc.country}
              </span>
            </div>
          </td>
          <td>
            <div className='status-info'>
              Status:{' '}
              <span
                style={{
                  fontFamily: 'Cereal-Medium',
                  color: utilService.getStatusColor(order.aboutOrder.status),
                }}
              >
                {order.aboutOrder.status}
              </span>
            </div>
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
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
