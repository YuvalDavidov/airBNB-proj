import { Fragment, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useForm } from "../customHooks/useForm.js"

import { PlaceFilter } from './place-filter.jsx'
import { DateFilter } from './date-filter.jsx'
import { GuestFilter } from './guest-filter.jsx'

import { stayService } from "../services/stay.service.local"
import { utilService } from "../services/util.service.js"
import { setFilterBy, toggleExpand } from "../store/stay.actions.js"

import { IoSearchCircleSharp } from 'react-icons/io5'
import { IconContext } from "react-icons"


export function HeaderFilter() {

    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
    const isHeadFilterExpanded = useSelector((storeState) => storeState.stayModule.isHeadFilterExpanded)

    const [filterByToEdit, setFilterByToEdit, handleChange] = useForm()

    function onDateClick() {
        toggleExpand(true)
    }
    function onLocationClick() {
        toggleExpand(true)
    }
    function onGuestClick() {
        toggleExpand(true)
    }

    // function onSubmitFilter(ev) {
    //     ev.preventDefault()
    //     setFilterBy(filterByToEdit)
    // }
    return (
        <Fragment>
            <div className="flex">
                {!isHeadFilterExpanded &&
                    <section className="stay-header-filter flex">
                        <button onClick={onLocationClick} className="header-filter-btn flex"><div>Anywhere</div></button> <span className="splitter"></span>
                        <button onClick={onDateClick} className="header-filter-btn flex"><div>Any week</div></button> <span className="splitter"></span>
                        <button onClick={onGuestClick} className="header-filter-btn guests flex"><div>Add guests</div></button>
                        <IconContext.Provider value={{ color: "red", className: "search-icon flex", size: '32px' }}>
                            <div onClick={onLocationClick}>
                                <IoSearchCircleSharp /></div>
                        </IconContext.Provider>

                    </section>
                }
                {isHeadFilterExpanded &&

                    <section className="stay-header-filter flex">

                        <button className="header-filter-btn flex"><div>Where</div></button> <span className="splitter"></span>
                        <button onClick={onDateClick} className="header-filter-btn flex"><div>Any week</div></button> <span className="splitter"></span>
                        <button onClick={onDateClick} className="header-filter-btn flex"><div>Any week</div></button> <span className="splitter"></span>
                        <button className="header-filter-btn guests flex"><div>Add guests</div></button>
                        <IconContext.Provider value={{ color: "red", className: "search-icon flex", size: '32px' }}>
                            <div>
                                <IoSearchCircleSharp /></div>
                        </IconContext.Provider>



                    </section>}
            </div>

        </Fragment>)

}