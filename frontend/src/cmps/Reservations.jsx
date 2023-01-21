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

    useEffect(() => {
        loadOrders({ hostId: userService.getLoggedinUser()._id })
    }, [])

    if (orders.length <= 0) return <div>you have nothing</div>

    return (
        <section className="reservations">
            reservations
            <section className="charts">

                <div className="listing">
                    <h1>Reservations / listing</h1>
                    <ListingChart orders={orders} />
                </div>


            </section>


        </section>
    )
}
