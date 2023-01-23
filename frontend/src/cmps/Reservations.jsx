import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userService } from "../services/user.service";
import { loadOrders, setOrderStatus } from "../store/order.actions";
import { ListingChart } from "./listing-chart";
import { range } from 'lodash'
import { ReservBarChart } from "./reservations-bar-chart";



export function Reservations() {
    // const [orders, setOrders] = useState(null)
    const { user } = useSelector((storeState) => storeState.userModule)
    const { orders } = useSelector((storeState) => storeState.orderModule)

    console.log(orders);

    useEffect(() => {
        loadOrders({ hostId: userService.getLoggedinUser()._id })
    }, [])

    function getFullDate(date) {
        let day = new Date(date).getDate()
        let month = new Date(date).getMonth() +1
        let year = new Date(date).getFullYear()

        return `${month}/${day}/${year}`
    }

    if (orders.length <= 0) return <div>you have no order's</div>

    function getStatusColor(status) {
        switch (status) {
            case 'Approved':
                return 'green'
            case 'Rejected':
                return 'red'
            default: 
                return 'rgb(34,34,34)'
        }
    }

    function calcMonthsBack() {
        const currMonth = new Date().getMonth()
        if (currMonth - 4 >= 0) {
            return range(currMonth - 4, currMonth+1)
        } else {
            return [...range(12 + (currMonth - 4),12), ...range(0, currMonth + 1)]
        }
    }

    console.log(calcMonthsBack())

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
                            <td>{getFullDate(order.aboutOrder.startDate)}</td>
                            <td>{getFullDate(order.aboutOrder.endDate)}</td>
                            <td>{getFullDate(order.aboutOrder.bookDate)}</td>
                            <td>{order.aboutOrder.stay.name}</td>
                            <td>₪{order.aboutOrder.totalPrice}</td>
                            <td style={{fontFamily: 'Cereal-Medium', color: getStatusColor(order.aboutOrder.status)}}>{order.aboutOrder.status}</td>
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
