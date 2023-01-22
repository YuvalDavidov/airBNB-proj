import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userService } from "../services/user.service";
import { loadOrders } from "../store/oreder.actions";
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

        console.log(day);
        return 1
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

            <table className="listing-table">
                <tbody>

                    <tr>
                        <th>Guest</th>
                        <th>CHECK IN</th>
                        <th>CAPACITY</th>
                        <th>BEDROOMS</th>
                        <th>PRICE</th>
                        <th>LOCATION</th>
                        <th>DATE ADDED</th>
                    </tr>
                    {orders.map((order) => {
                        return <tr key={order._id} className="data">
                            <td>{order.aboutUser.fullname}</td>
                            <td>{getFullDate(order.aboutOrder.startDate)}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    })}

                </tbody>
            </table>

        </section>
    )
}
