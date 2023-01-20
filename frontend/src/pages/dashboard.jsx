import { useEffect } from "react";
import { NavLink, Outlet, Route, Router } from "react-router-dom";
import { StayEdit } from "../cmps/stay-edit";
import { loadMyStays } from "../store/stay.actions";


export function Dashboard() {


    // useEffect(() => {
    //     loadMyStays({ hostId: user._id })
    // }, [])


    return (
        <section className="dashbord main-layout">
            <nav>
                <NavLink to="/dashboard">Create listing</NavLink>
                <NavLink to="/dashboard/listings">Listings</NavLink>
                <NavLink to="/dashboard/reservations">Reservations</NavLink>
            </nav>

            <Outlet />
        </section>
    )
}


const user = {
    "_id": "u103",
    "fullname": "User 1",
    "imgUrl": "/img/img1.jpg",
    "username": "user1",
    "password": "secret",
    "isHost": true,
    "staysIds": ['10006546', '10006547', '10006548']
}