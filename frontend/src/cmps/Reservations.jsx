import { useEffect } from "react"
import { useSelector } from "react-redux"

import { userService } from "../services/user.service"
import { utilService } from "../services/util.service"
import { loadOrders, setOrderStatus } from "../store/order.actions"

import { ListingChart } from "./listing-chart"
import { ReservBarChart } from "./reservations-bar-chart"


export function Reservations() {
    // const [orders, setOrders] = useState(null)
    const { user } = useSelector((storeState) => storeState.userModule)
    const { orders } = useSelector((storeState) => storeState.orderModule)

    useEffect(() => {
        loadOrders({ hostId: userService.getLoggedinUser()._id })
    }, [])


    return (
        <section className="reservations">
            <section className="charts">

                
                <div className="listing">
                    <h2>Revenue / month</h2>
                    <div className="bar-chart">
                    <ReservBarChart orders={orders} />
                    </div>
                </div>

                <div className="listing">
                    <h2>Reservations status</h2>
                    <div className="reservations-status">
                        <div className="status-info">
                            <span className="status-name">Pending</span>
                            <span className="status-count pending">{orders.filter(order => order.aboutOrder.status === 'Pending').length}</span>
                        </div>
                        <div className="status-info">
                            <span className="status-name">Approved</span>
                            <span className="status-count approved">{orders.filter(order => order.aboutOrder.status === 'Approved').length}</span>
                        </div>
                        <div className="status-info">
                            <span className="status-name">Rejected</span>
                            <span className="status-count rejected">{orders.filter(order => order.aboutOrder.status === 'Rejected').length}</span>
                        </div>
                    </div>
                </div>

                <div className="listing">
                    <h2>Reservations / listing</h2>
                    <div className="dougnut-chart">
                    <ListingChart orders={orders} />
                    </div>
                </div>


            </section>

            <table className="reservation-table">
                <tbody>

                    <tr>
                        <th>Guest</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Booked</th>
                        <th>Listing</th>
                        <th>Total Payout</th>
                        <th className="status-td">Status</th>
                        <th className="todo-td">To do</th>

                    </tr>
                    {orders.map((order) => {
                        return <tr key={order._id} className="data">
                            <td className="guest-td"><img src={order.aboutUser.imgUrl} className="mini-img" alt=""/> {order.aboutUser.fullname}</td>
                            <td>{utilService.getFullDate(order.aboutOrder.startDate)}</td>
                            <td>{utilService.getFullDate(order.aboutOrder.endDate)}</td>
                            <td>{utilService.getFullDate(order.aboutOrder.bookDate)}</td>
                            <td>{order.aboutOrder.stay.name}</td>
                            <td>₪{order.aboutOrder.totalPrice}</td>
                            <td style={{fontFamily: 'Cereal-Medium', color: utilService.getStatusColor(order.aboutOrder.status)}}>{order.aboutOrder.status}</td>
                            <td>
                                <button className={order.aboutOrder.status === 'Approved' ? 'approve-btn is-active' : 'approve-btn'} onClick={() => setOrderStatus(order, 'Approved')}>Approve</button>
                                <button className={order.aboutOrder.status === 'Rejected' ? 'reject-btn is-active' : 'reject-btn'} onClick={() => setOrderStatus(order, 'Rejected')}>Reject</button>
                            </td>
                        </tr>
                    })}

                </tbody>
            </table>

        </section>
    )
}
