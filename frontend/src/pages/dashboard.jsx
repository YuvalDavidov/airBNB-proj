import { useEffect } from "react";
import { NavLink, Outlet, Route, Router } from "react-router-dom";
import { StayEdit } from "../cmps/stay-edit";
import { userService } from "../services/user.service";
import { loadMyStays } from "../store/stay.actions";


export function Dashboard() {


    useEffect(() => {
        loadMyStays({ hostId: userService.getLoggedinUser()._id })
    }, [])



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

