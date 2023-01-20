import { NavLink, Outlet, Route, Router } from "react-router-dom";
import { StayEdit } from "../cmps/stay-edit";


export function Dashboard() {



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