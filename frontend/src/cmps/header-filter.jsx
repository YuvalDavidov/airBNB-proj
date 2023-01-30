import { Fragment, useState } from "react"
import { useSelector } from "react-redux"

import { PlaceFilter } from './place-filter.jsx'
import { DateFilter } from './date-filter.jsx'
import { GuestFilter } from './guest-filter.jsx'

import { stayService } from "../services/stay.service"
import { utilService } from "../services/util.service.js"
import { setFilterBy, toggleExpand } from "../store/stay.actions.js"

import { IoSearchCircleSharp } from 'react-icons/io5'
import { IconContext } from "react-icons"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { CgUnsplash } from "react-icons/cg"


export function HeaderFilter() {

    const [searchParams, setSearchParams] = useSearchParams()

    const isHeadFilterExpanded = useSelector((storeState) => storeState.stayModule.isHeadFilterExpanded)
    const locations = useSelector((storeState) => storeState.stayModule.locations)
    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
    const [locationList, setLocationList] = useState(locations)
    const [isLocationExpand, setIsLocationExpand] = useState(false)
    const [isDateExpand, setIsDateExpand] = useState(false)
    const [isCheckinExpand, setIsCheckinExpand] = useState(false)
    const [isCheckoutExpand, setIsCheckoutExpand] = useState(false)
    const [isGuestExpand, setIsGuestExpand] = useState(false)
    const [filterByToEdit, setFilterByToEdit] = useState({ locationCity: '', locationCountry: '', startDate: false, endDate: false, guests: { total: 0 } })
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    function setShownLocations() {

        const regex = new RegExp(filterByToEdit.locationCity, 'i')

        let filteredByLocations
        if (filterByToEdit.locationCity) {
            filteredByLocations = locations.filter(location => regex.test(location.city))
            if (!filteredByLocations.length) filteredByLocations = locations.filter(location => regex.test(location.country))
            setLocationList(filteredByLocations)
        } else setLocationList(locations)
    }





    useEffect(() => {
        setShownLocations()


    }, [filterByToEdit.locationCity])

    useEffect(() => {
        setFilterByToEdit({ locationCity: '', locationCountry: '', startDate: false, endDate: false, guests: { total: 0 } })
        setLocationList(locations)
        // console.log(isHeadFilterExpanded)

    }, [isHeadFilterExpanded])



    function handleLocationChange({ target }) {
        let { value, name: field } = target
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSetLocation(location) {
        let city = location.city
        let country = location.country

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, locationCity: city, locationCountry: country }))

    }

    function onSetGuestFilter(numOfGuests) {
        console.log(numOfGuests)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, guests: numOfGuests }))
    }


    function updateDate(date) {
        console.log(date)
        if (isCheckinExpand) onCheckoutClick()
        if (isCheckoutExpand) onMoveToGuestFilter()
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, startDate: date.startDate, endDate: date.endDate }))
    }


    function onCheckInClick() {
        setIsCheckinExpand(true)
        setIsCheckoutExpand(false)
        setIsDateExpand(true)
        setIsGuestExpand(false)
        setIsLocationExpand(false)
    }
    function onCheckoutClick() {
        setIsCheckinExpand(false)
        setIsCheckoutExpand(true)
        setIsDateExpand(true)
        setIsGuestExpand(false)
        setIsLocationExpand(false)
    }

    function onLocationClick() {
        toggleExpand(true)
        setIsCheckinExpand(false)
        setIsCheckoutExpand(false)
        setIsDateExpand(false)
        setIsGuestExpand(false)
        setIsLocationExpand(true)
    }

    function onDateClick() {
        toggleExpand(true)
        setIsCheckinExpand(true)
        setIsCheckoutExpand(false)
        setIsDateExpand(true)
        setIsGuestExpand(false)
        setIsLocationExpand(false)

    }


    function onGuestClick() {
        toggleExpand(true)
        setIsDateExpand(false)
        setIsGuestExpand(true)
        setIsLocationExpand(false)
        setIsCheckinExpand(false)
        setIsCheckoutExpand(false)
    }

    function onMoveToDateFilter() {
        setIsCheckinExpand(true)
        setIsDateExpand(true)
        setIsGuestExpand(false)
        setIsLocationExpand(false)
    }

    function onMoveToGuestFilter() {
        setIsCheckinExpand(false)
        setIsCheckoutExpand(false)
        setIsDateExpand(false)
        setIsGuestExpand(true)
    }


    function onSubmitSearch(ev) {
        ev.preventDefault()
        console.log('filterByToEdit------>', filterByToEdit)
        setSearchParams({
            ...filterBy, locationCountry: filterByToEdit.locationCountry, locationCity: filterByToEdit.locationCity,
            startDate: filterByToEdit.startDate, endDate: filterByToEdit.endDate, guests: filterByToEdit.guests.total,
            adults: filterByToEdit.guests.adults, children: filterByToEdit.guests.children, infants: filterByToEdit.guests.infants,
            pets: filterByToEdit.guests.pets

        })
        setFilterBy({
            ...filterBy, locationCountry: filterByToEdit.locationCountry, locationCity: filterByToEdit.locationCity,
            startDate: filterByToEdit.startDate, endDate: filterByToEdit.endDate, guests: filterByToEdit.guests.total
        })

        toggleExpand(false)
        console.log('submited')
    }



    return (
        <Fragment>
            <section className={`stay-header-filter ${(isHeadFilterExpanded) ? 'extanded' : ''}`}>
                {!isHeadFilterExpanded && <div className="form-header flex align-center"><button onClick={onLocationClick} className="header-filter-btn header-text flex"><div>
                    {(filterBy.locationCity) ? filterBy.locationCity : 'Anywhere'}</div></button> <span className="splitter"></span>
                    <button onClick={onDateClick} className="header-filter-btn header-text flex"><div>
                        {(filterBy.startDate) ? (months[(filterBy.startDate).getMonth()] + ' ' + (filterBy.startDate).getDate()) + ' ' +
                            months[(filterBy.endDate).getMonth()] + ' ' + (filterBy.endDate).getDate() : 'Any week'}</div>
                    </button> <span className="splitter"></span>
                    <button onClick={onGuestClick} className={`header-filter-btn add-guests flex ${(filterBy.guests > 0) ? `bold` : ``}`}><div>
                        {(filterBy.guests > 0) ? filterBy.guests + ' Guests' : 'Add guests'}</div></button>
                    <IconContext.Provider value={{ color: "FF385C", className: "search-icon flex", size: '42px' }}>
                        <div onClick={onLocationClick}>
                            <IoSearchCircleSharp /></div>
                    </IconContext.Provider></div>}
                {isHeadFilterExpanded && <div className="form-header-extanded flex" >
                    <div className={`flex column location-container ${(isLocationExpand) ? 'filter-active' : ''}`}>
                        <button onClick={onLocationClick} className="header-filter-btn flex">
                            <span onClick={onLocationClick} className="filter-main-text">Where</span></button>
                        <input onClick={onLocationClick} placeholder="Search destenations" className="search-filter-input" type="text"
                            name="locationCity"
                            value={filterByToEdit.locationCity}
                            onChange={handleLocationChange}
                        />
                        {isLocationExpand && <PlaceFilter locationList={locationList} onSetLocation={onSetLocation} onMoveToDateFilter={onMoveToDateFilter} />}
                    </div>
                    <div className={`flex align-center date-container`}>
                        <button onClick={onCheckInClick} className={`flex column check-in ${(isCheckinExpand) ? 'filter-active' : ''}`}>
                            <span onClick={onCheckInClick} className="filter-main-text">Check in</span>
                            <div onClick={onCheckInClick} className="filter-sub-text">{(!filterByToEdit.startDate) ? 'Add dates' : months[(filterByToEdit.startDate).getMonth()] + ' ' + (filterByToEdit.startDate).getDate()}</div>
                        </button>

                        <button onClick={onCheckoutClick} className={`flex column check-out ${(isCheckoutExpand) ? 'filter-active' : ''}`}>
                            <span onClick={onCheckoutClick} className="filter-main-text">Check out</span>
                            <div onClick={onCheckoutClick} className="filter-sub-text">{(!filterByToEdit.endDate) ? 'Add dates' : months[(filterByToEdit.endDate).getMonth()] + ' ' + (filterByToEdit.endDate).getDate()}</div>
                        </button>

                        {isDateExpand && <DateFilter updateDate={updateDate} />}
                    </div>

                    <div className={`flex align-center guest-container ${(isGuestExpand) ? 'filter-active' : ''}`}>
                        <button onClick={onGuestClick} className="flex column">
                            <span onClick={onGuestClick} className="filter-main-text">Who?</span>
                            <span onClick={onGuestClick} className="filter-sub-text">{(filterByToEdit.guests.total) ? ((filterByToEdit.guests.adults +
                                filterByToEdit.guests.children) + ' Adults' +
                                ((filterByToEdit.guests.infants) ? ', ' + filterByToEdit.guests.infants + ' Infants' : '') +
                                (((filterByToEdit.guests.pets) ? ', ' + filterByToEdit.guests.pets + ' Pets' : '')))
                                : 'Add guests'}</span>
                        </button>
                        <IconContext.Provider value={{ color: "FF385C", className: "search-icon-expand", size: '60px' }}>
                            <div className="icon-search-container">
                                <button onClick={onSubmitSearch}>  <IoSearchCircleSharp /> </button>

                            </div>
                        </IconContext.Provider>
                        {isGuestExpand && <GuestFilter onSetGuestFilter={onSetGuestFilter} />}
                    </div>

                </div>}

            </section>








        </Fragment>)

}