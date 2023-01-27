import { Fragment, useState } from "react"
import { useSelector } from "react-redux"

import { PlaceFilter } from './place-filter.jsx'
import { DateFilter } from './date-filter.jsx'
import { GuestFilter } from './guest-filter.jsx'

import { stayService } from "../services/stay.service.local"
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
    const [isLocationExpand, setIsLocationExpand] = useState(false)
    const [isDateExpand, setIsDateExpand] = useState(false)
    const [isGuestExpand, setIsGuestExpand] = useState(false)
    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
    const [filterByToEdit, setFilterByToEdit] = useState({ locationCity: '', locationCountry: '', startDate: false, endDate: false, guests: { total: 0 } })
    const [locations, setLocations] = useState([])
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


    useEffect(() => {
        loadLocations()

    }, [filterByToEdit.locationCity])

    useEffect(() => {
        setFilterByToEdit({ locationCity: '', locationCountry: '', startDate: false, endDate: false, guests: { total: 0 } })

    }, [isHeadFilterExpanded])

    function handleLocationChange({ target }) {
        let { value, name: field } = target
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSetLocation(location) {
        let city = location.city
        let country = location.country.loc.country

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, locationCity: city, locationCountry: country }))

    }

    function onSetGuestFilter(numOfGuests) {
        console.log(numOfGuests)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, guests: numOfGuests }))
    }


    function updateDate(date) {
        console.log(date)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, startDate: date.startDate, endDate: date.endDate }))
    }

    async function loadLocations() {
        let uniqueLocations
        try {
            const listOfStays = await stayService.query(stayService.getDefaultFilter())
            let uniqueCities = [...new Set(listOfStays.map(stay => { return stay.loc.city }))]
            uniqueLocations = uniqueCities.map(city => {
                return {
                    city, country: listOfStays.find(stay => {
                        if (stay.loc.city === city) return stay.loc.country
                    })
                }
            })
        } catch (err) {
            console.error('couldnt load locations')
        }
        const regex = new RegExp(filterByToEdit.locationCity, 'i')

        let filteredBy
        if (filterByToEdit.locationCity) {
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
        setSearchParams({
            ...filterBy, locationCountry: filterByToEdit.locationCountry, locationCity: filterByToEdit.locationCity,
            startDate: filterByToEdit.startDate, endDate: filterByToEdit.endDate, guests: filterByToEdit.guests.total
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
                {!isHeadFilterExpanded && <div className="form-header flex align-center"><button onClick={onLocationClick} className="header-filter-btn flex"><div>
                    {(filterBy.locationCity) ? filterBy.locationCity : 'Anywhere'}</div></button> <span className="splitter"></span>
                    <button onClick={onDateClick} className="header-filter-btn flex"><div>
                        {(filterBy.startDate) ? (months[(filterBy.startDate).getMonth()] + ' ' + (filterBy.startDate).getDate()) + ' ' +
                            months[(filterBy.endDate).getMonth()] + ' ' + (filterBy.endDate).getDate() : 'Any week'}</div>
                    </button> <span className="splitter"></span>
                    <button onClick={onGuestClick} className={`header-filter-btn add-guests flex ${(filterBy.guests > 0) ? `bold` : ``}`}><div>
                        {(filterBy.guests > 0) ? filterBy.guests + ' Guests' : 'Add guests'}</div></button>
                    <IconContext.Provider value={{ color: "red", className: "search-icon flex", size: '42px' }}>
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
                        {isLocationExpand && <PlaceFilter locations={locations} onSetLocation={onSetLocation} onMoveToDateFilter={onMoveToDateFilter} />}
                    </div>
                    <div className={`flex align-center date-container ${(isDateExpand) ? 'filter-active' : ''}`}>
                        <button onClick={onDateClick} className="flex column">
                            <span onClick={onDateClick} className="filter-main-text">Check in</span>
                            <div onClick={onDateClick} className="filter-sub-text">{(!filterByToEdit.startDate) ? 'Add dates' : months[(filterByToEdit.startDate).getMonth()] + ' ' + (filterByToEdit.startDate).getDate()}</div>
                        </button>

                        <button onClick={onDateClick} className="flex column">
                            <span onClick={onDateClick} className="filter-main-text">Check out</span>
                            <div onClick={onDateClick} className="filter-sub-text">{(!filterByToEdit.endDate) ? 'Add dates' : months[(filterByToEdit.endDate).getMonth()] + ' ' + (filterByToEdit.endDate).getDate()}</div>
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
                        <IconContext.Provider value={{ color: "red", className: "search-icon-expand", size: '60px' }}>
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