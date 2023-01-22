import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userService } from "../services/user.service";
import { loadOrders } from "../store/order.actions";
import { ListingChart } from "./listing-chart";




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

    return (
        <section className="reservations">
            reservations
            <section className="charts">

                <div className="listing">
                    <h1>Reservations / listing</h1>
                    <ListingChart orders={orders} />
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
                        <th>Status</th>
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
                            <td>{order.aboutOrder.status}</td>
                            <td>
                                <button className="approve-btn">Approve</button>
                                <button className="reject-btn">Reject</button>
                            </td>
                        </tr>
                    })}

                </tbody>
            </table>

        </section>
    )
}
