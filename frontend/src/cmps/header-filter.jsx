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

    const isHeadFilterExpanded = useSelector((storeState) => storeState.stayModule.isHeadFilterExpanded)
    const [isLocationExpand, setIsLocationExpand] = useState(false)
    const [isDateExpand, setIsDateExpand] = useState(false)
    const [isGuestExpand, setIsGuestExpand] = useState(false)
    const [filterByToEdit, setFilterByToEdit, handleChange] = useForm()

    function onDateClick() {
        toggleExpand(true)
        setIsDateExpand(true)
        setIsGuestExpand(false)
        setIsLocationExpand(false)
    }
    function onLocationClick() {
        toggleExpand(true)
        setIsDateExpand(false)
        setIsGuestExpand(false)
        setIsLocationExpand(true)
    }
    function onGuestClick() {
        toggleExpand(true)
        setIsDateExpand(false)
        setIsGuestExpand(true)
        setIsLocationExpand(false)
    }

    function onSubmitSearch(ev) {
        ev.preventDefault()
        console.log('submited')
    }

    // function onSubmitFilter(ev) {
    //     ev.preventDefault()
    //     setFilterBy(filterByToEdit)
    // }
    return (
        <Fragment>

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

                <section className="stay-header-filter-extanded">
                    <form className="head-filter-form flex align-center" onSubmit={onSubmitSearch}>
                        <div>
                            <button onClick={onLocationClick} className="header-filter-btn flex"><div>Where</div></button> <span className="splitter"></span>
                            {isLocationExpand && <PlaceFilter />}
                        </div>
                        <div className="flex">
                            <button onClick={onDateClick} className="header-filter-btn flex"><div>Any week</div></button> <span className="splitter"></span>
                            <button onClick={onDateClick} className="header-filter-btn flex"><div>Any week</div></button> <span className="splitter"></span>
                            {isDateExpand && <DateFilter />}
                        </div>

                        <div>
                            <button onClick={onGuestClick} className="header-filter-btn guests"><div>Add guests</div></button>
                            {isGuestExpand && <GuestFilter />}
                        </div>
                        <IconContext.Provider value={{ color: "red", className: "search-icon flex", size: '32px' }}>
                            <div>
                                <button>  <IoSearchCircleSharp /> </button>

                            </div>
                        </IconContext.Provider>
                    </form>
                </section>}



        </Fragment>)

}