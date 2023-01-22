import { Fragment, useRef, useState } from "react"
import { useSelector } from "react-redux"

import { PlaceFilter } from './place-filter.jsx'
import { DateFilter } from './date-filter.jsx'
import { GuestFilter } from './guest-filter.jsx'

import { stayService } from "../services/stay.service.local"
import { utilService } from "../services/util.service.js"
import { loadStays, setFilterBy, toggleExpand } from "../store/stay.actions.js"

import { IoSearchCircleSharp } from 'react-icons/io5'
import { IconContext } from "react-icons"
import { useEffect } from "react"


export function HeaderFilter() {

    const isHeadFilterExpanded = useSelector((storeState) => storeState.stayModule.isHeadFilterExpanded)
    const [isLocationExpand, setIsLocationExpand] = useState(false)
    const [isDateExpand, setIsDateExpand] = useState(false)
    const [isGuestExpand, setIsGuestExpand] = useState(false)
    const [date, setDate] = useState(false)
    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
    const [filterByToEdit, setFilterByToEdit] = useState({ city: '', country: '', startDate: Date.now(), endDate: Date.now(), guests: 0 })
    const stays = useSelector((storeState) => storeState.stayModule.stays)
    const [locations, setLocations] = useState([])
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


    useEffect(() => {
        loadLocations()
    }, [isHeadFilterExpanded, filterByToEdit])

    useEffect(() => {
        loadStays(filterBy)
        setFilterBy(stayService.getDefaultFilter())
    }, [isHeadFilterExpanded])

    function handleLocationChange({ target }) {
        let { value, name: field, type } = target
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSetLocation(location) {
        let city = location.city
        let country = location.country.loc.country

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, city: city, country }))

    }

    function onSetGuestFilter(numOfGuests) {
        console.log(numOfGuests)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, guests: numOfGuests.total }))
    }


    function updateDate(date) {
        // console.log(date)
        setDate(date)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, startDate: date.startDate, endDate: date.endDate }))
    }

    function loadLocations() {
        const regex = new RegExp(filterByToEdit.city, 'i')
        let uniqueCities = [...new Set(stays.map(stay => { return stay.loc.city }))]
        let uniqueLocations = uniqueCities.map(city => {
            return {
                city, country: stays.find(stay => {
                    if (stay.loc.city === city) return stay.loc.country
                })
            }
        })
        let filteredBy
        if (filterByToEdit.city) {
            filteredBy = uniqueLocations.filter(location => regex.test(location.city))
            if (!filteredBy.length) filteredBy = uniqueLocations.filter(location => regex.test(location.country.loc.country))
            setLocations(filteredBy)
        } else setLocations(uniqueLocations)
    }
    function onLocationClick() {
        toggleExpand(true)
        setIsDateExpand(false)
        setIsGuestExpand(false)
        setIsLocationExpand(true)
    }

    function onDateClick() {
        toggleExpand(true)
        setIsDateExpand(true)
        setIsGuestExpand(false)
        setIsLocationExpand(false)

    }

    function onMoveToDateFilter() {
        setIsDateExpand(true)
        setIsGuestExpand(false)
        setIsLocationExpand(false)
    }

    function onGuestClick() {
        toggleExpand(true)
        setIsDateExpand(false)
        setIsGuestExpand(true)
        setIsLocationExpand(false)
    }

    function onSubmitSearch(ev) {
        ev.preventDefault()
        console.log('filterByToEdit------>', filterByToEdit)
        setFilterBy({
            ...filterBy, locationCountry: filterByToEdit.country, locationCity: filterByToEdit.city,
            startDate: filterByToEdit.startDate, endDate: filterByToEdit.endDate, guests: filterByToEdit.guests
        })

        toggleExpand(false)
        console.log('submited')
    }



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
                    <div className="head-filter-form flex align-center" >
                        <div className="flex column">
                            <button onClick={onLocationClick} className="header-filter-btn flex"><div className="where">Where</div></button>
                            <input className="search-filter-input" type="text"
                                name="city"
                                value={filterByToEdit.city}
                                onChange={handleLocationChange}
                            />
                            {isLocationExpand && <PlaceFilter locations={locations} onSetLocation={onSetLocation} onMoveToDateFilter={onMoveToDateFilter} />}
                        </div>
                        <div className="flex">
                            <button onClick={onDateClick} className="header-filter-btn flex"><div>{(!date.startDate) ? 'Add dates' : months[(date.startDate).getMonth()] + ' ' + (date.startDate).getDate()}</div></button>
                            <button onClick={onDateClick} className="header-filter-btn flex"><div>{(!date.endDate) ? 'Add dates' : months[(date.endDate).getMonth()] + ' ' + (date.endDate).getDate()}</div></button>
                            {isDateExpand && <DateFilter updateDate={updateDate} />}
                        </div>

                        <div>
                            <button onClick={onGuestClick} className="header-filter-btn guests"><div>Add guests</div></button>
                            {isGuestExpand && <GuestFilter onSetGuestFilter={onSetGuestFilter} />}
                        </div>
                        <IconContext.Provider value={{ color: "red", className: "search-icon flex", size: '32px' }}>
                            <div>
                                <button onClick={onSubmitSearch}>  <IoSearchCircleSharp /> </button>

                            </div>
                        </IconContext.Provider>
                    </div>
                </section>}



        </Fragment>)

}