import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { loadStays, saveStay } from "../store/stay.actions";
import { StayList } from "../cmps/stay-list";
import { stayService } from "../services/stay.service.local";


export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const [userLocation, setUserLocation] = useState({lat: 32.078618, lng: 34.774071})
    const [ addModal, setAddModal] = useState(false)
    const [ stayToEdit, setStayToEdit ] = useState(stayService.getEmptyStay())
    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)

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

    function handleChangeLoc({target}) {
        const {value, name:field} = target
        setStayToEdit(prevStayToEdit => ({...prevStayToEdit, loc: {...prevStayToEdit.loc, [field]: value}}))
    }

    function handleChangePrice({target}) {
        const {value} = target
        setStayToEdit(prevStayToEdit => ({...prevStayToEdit, price: +value}))
    }

    function onSaveStay(ev) {
        ev.preventDefault()
        saveStay(stayToEdit)
        setStayToEdit(stayService.getEmptyStay())
        setAddModal(false)
    }

    return <section className="stay-index">
        <button className="add-btn" onClick={() => setAddModal(true)}>Add Stay</button>
        < StayList stays={stays} userLocation={userLocation} />
        {addModal && <>
        <div className="main-screen" onClick={() => setAddModal(false)}></div>
        <div className="edit-stay-modal">
            <h2>Add stay:</h2>
            <form onSubmit={onSaveStay}>
                <label>City:
                    <input
                    type="text"
                    name="city"
                    value={stayToEdit.loc.city}
                    onChange={handleChangeLoc}
                    />
                </label>
                <label>Country:
                    <input
                    type="text"
                    name="country"
                    value={stayToEdit.loc.country}
                    onChange={handleChangeLoc}
                    />
                </label>
                <label>Price:
                    <input
                    type="number"
                    name="price"
                    value={stayToEdit.price}
                    onChange={handleChangePrice}
                    />
                </label>

                <button>Save stay</button>
            </form>
        </div>
        </>}
    </section>
}