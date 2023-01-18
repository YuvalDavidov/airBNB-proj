import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { loadStays } from "../store/stay.actions";
import { StayList } from "../cmps/stay-list";


export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)

    const [userLocation, setUserLocation] = useState({ lat: 32.078618, lng: 34.774071 })

    useEffect(() => {
        onLoadStays(filterBy)
        getUserLocation()
    }, [])

    async function onLoadStays(filterBy) {
        try {
            await loadStays(filterBy)
            // showSuccessMsg('Stays loaded')
        } catch (err) {
            // showErrorMsg('Cannot load Stays')
        }
    }
    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(convertLocation)
        }

        function convertLocation(location) {
            console.log(location)

        }
    }

    return <section className="stay-index">
        < StayList stays={stays} />
    </section>
}