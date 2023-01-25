import { useState } from 'react'

import { utilService } from '../services/util.service'

export function UserTripsTr({ order }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <tr className='top-tr' onClick={() => setIsOpen(!isOpen)}>
        <td className='destination-td'>{order.aboutOrder.stay.name}</td>
        <td>
          {utilService.getFullDate(order.aboutOrder.startDate) +
            ' - ' +
            utilService.getFullDate(order.aboutOrder.endDate)}
        </td>
      </tr>
      {isOpen && (
        <tr className='bottom-tr'>
          <td>
            <div className='host-info'>
              Host: <span>{order.aboutOrder.stay.host.fullname}</span>
            </div>
            <div className="location-info">
                Location: <span>{order.aboutOrder.stay.loc.city}, {order.aboutOrder.stay.loc.country}</span>
            </div>
          </td>
          <td>
          <div className="price-info">
                Total price: <span>${order.aboutOrder.totalPrice.toLocaleString('en-US')}</span>
            </div>
            <div className="status-info">
                Status: <span style={{fontFamily: 'Cereal-Medium', color: utilService.getStatusColor(order.aboutOrder.status)}}>{order.aboutOrder.status}</span>
            </div></td>
        </tr>
      )}
    </>
  )
}
