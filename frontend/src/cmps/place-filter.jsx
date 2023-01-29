import { IoLocationOutline } from 'react-icons/io5'
import { IconContext } from "react-icons"

export function PlaceFilter({ locationList, onSetLocation, onMoveToDateFilter }) {
    return (
        <section className="place-modal">
            <ul>
                {locationList && locationList.map((location) => <li onClick={() => {
                    onSetLocation(location)
                    onMoveToDateFilter()
                }} className="flex location-list" key={location.city}>
                    <IconContext.Provider value={{ color: "black", className: "location-icon", size: '30px' }}>
                        <div className='flex align-center icon-wrapper'>
                            <IoLocationOutline /></div>
                    </IconContext.Provider>
                    {location.city + ', ' + location.country}
                </li>)}
            </ul>
        </section >
    )
}

// locations2[0].city, locations2[0].country.loc.country