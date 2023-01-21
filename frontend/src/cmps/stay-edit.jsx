import { useEffect } from "react"
import { useState } from "react"
import { Await, useNavigate, useParams } from "react-router"
import { stayService } from "../services/stay.service.local"
import { uploadService } from "../services/upload.service"
import { MultiAmenitiesSelect } from "./multi-amenities-select"
import { MultiLabelsSelect } from "./multi-select-lables"
import { showErrorMsg } from "../services/event-bus.service"
import axios from "axios"


export function StayEdit() {

    const [stayToEdit, setStayToEdit] = useState(stayService.getEmptyStay())
    const navigate = useNavigate()
    const { stayId } = useParams()

    useEffect(() => {
        const button = document.querySelector('.edit-btn')
        button.addEventListener('mousemove', e => {
            const rect = button.getBoundingClientRect();
            const x = (e.clientX - rect.left) * 100 / button.clientWidth
            const y = (e.clientY - rect.top) * 100 / button.clientHeight
            button.style.setProperty('--mouse-x', x);
            button.style.setProperty('--mouse-y', y);
        })

        if (!stayId) return
        loadStay(stayId)
    }, [])

    function loadStay(stayId) {
        stayService.getById(stayId)
            .then(setStayToEdit)
    }

    function handleChange({ target }) {
        let { value, name: field, type, checked } = target

        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = checked

            default:
                break;
        }

        if (field === 'city' || field === 'country' || field === 'address') {
            return setStayToEdit((prevStay) => ({ ...prevStay, loc: { ...prevStay.loc, [field]: value } }))
        }
        if (field === 'guests' || field === 'bedrooms' || field === 'beds' || field === 'sharedBath' || field === 'allowPets') {
            return setStayToEdit((prevStay) => ({ ...prevStay, stayDetails: { ...prevStay.stayDetails, [field]: value } }))

        }

        setStayToEdit((prevStay) => ({ ...prevStay, [field]: value }))
    }


    function handleLablesSelectChange(ev) {
        let labelsToEdit = ev.map(l => l.value)
        setStayToEdit((prevStay) => ({ ...prevStay, labels: labelsToEdit }))
    }

    function handleAmenitiesSelectChange(ev) {
        let labelsToEdit = ev.map(l => l.value)
        setStayToEdit((prevStay) => ({ ...prevStay, amenities: labelsToEdit }))
    }

    function onUploadImg(ev) {
        uploadService.uploadImg(ev)
            .then((imgUrl) => {
                setStayToEdit((prevStay) => ({ ...prevStay, imgUrls: [...prevStay.imgUrls, imgUrl.url] }))
            })
    }

    async function onGetLoc(streetName, countryName, cityName) {
        const API_KEY = 'AIzaSyDXu6P3aeP3Cp5pqy7wfSZ4A1WVBQo54Gg'
        const STREET_ADDRESS = streetName.split(' ').join('+')
        const CONTRY_NAME = countryName.split(' ').join('+')
        const CITY_NAME = cityName.split(' ').join('+')
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${STREET_ADDRESS, CONTRY_NAME, CITY_NAME}&key=${API_KEY}`

        return axios.get(url).then((res) => res.data.results[0].geometry.location)
    }

    function onRemoveImg(imgUrl) {
        let filteredImgs = stayToEdit.imgUrls.filter(url => url !== imgUrl)
        console.log(filteredImgs);

        return setStayToEdit((prevStay) => ({ ...prevStay, imgUrls: filteredImgs }))
    }

    async function onSubmit() {
        if (stayToEdit.name.length < 5) return showErrorMsg('stay Name is too short. need at least 5 letters')
        else if (stayToEdit.loc.city.length < 5) return showErrorMsg('stay City address is too short. need at least 5 letters')
        else if (stayToEdit.loc.country.length < 5) return showErrorMsg('stay Country address is too short. need at least 5 letters')
        else if (stayToEdit.loc.address.length < 5) return showErrorMsg('stay Address is too short. need at least 5 letters')
        else if (stayToEdit.loc.address.length < 5) return showErrorMsg('stay Country address is too short. need at least 5 letters')
        else if (stayToEdit.summary.length < 15) return showErrorMsg('stay Summary is too short. need at least 15 letters')

        if (stayToEdit.imgUrls.length <= 4) return showErrorMsg('stay Images is too short. need at least 5 images')

        if (stayToEdit.price <= 5) return showErrorMsg('stay Price is too Low.')
        else if (stayToEdit.stayDetails.guests <= 0) return showErrorMsg('stay Guests amount is too low. need at 1 guests')
        else if (stayToEdit.stayDetails.beds <= 0) return showErrorMsg('stay Beds amount is too low. need at 1 bed')

        const loc = await onGetLoc(stayToEdit.loc.address, stayToEdit.loc.country, stayToEdit.loc.city)
        let stayToSave = { ...stayToEdit }
        stayToSave.loc.lat = loc.lat
        stayToSave.loc.lng = loc.lng

        console.log('submit', loc);
        stayService.save(stayToSave)
            .then(() => navigate('/'))
    }
    console.log(stayToEdit);

    return (
        <section className="edit-stay">
            <label htmlFor="name">Name</label>
            <input type="text"
                id="name"
                name="name"
                value={stayToEdit.name}
                placeholder="Name"
                onChange={handleChange} />

            <label htmlFor="">Address</label>
            <div className="address">
                <label htmlFor="">City
                    <input type="text"
                        id="city"
                        name="city"
                        value={stayToEdit.loc.city}
                        placeholder="City"
                        onChange={handleChange} /></label>

                <label htmlFor="">Country
                    <input type="text"
                        id="country"
                        name="country"
                        value={stayToEdit.loc.country}
                        placeholder="Country"
                        onChange={handleChange} /></label>

                <label htmlFor="">Address
                    <input type="text"
                        id="address"
                        name="address"
                        value={stayToEdit.loc.address}
                        placeholder="Address"
                        onChange={handleChange} /></label>
            </div>

            <input type="file" className="file" onChange={(event) => { onUploadImg(event) }} />

            <div className="img-container">
                {stayToEdit.imgUrls.length > 0 ?
                    stayToEdit.imgUrls.map((url) => {
                        return <div className="imgUrl" key={url}><img src={url} /> <button onClick={() => { onRemoveImg(url) }}>x</button> </div>
                    }) : ''}
            </div>

            <label htmlFor="">Stay details
                <div className="edit-stay-details">
                    <label htmlFor="">Guests
                        <input type="number"
                            id="guests"
                            name="guests"
                            value={stayToEdit.stayDetails.guests}
                            placeholder="Guests"
                            onChange={handleChange} /></label>

                    <label htmlFor="">Bedrooms
                        <input type="number"
                            id="bedrooms"
                            name="bedrooms"
                            value={stayToEdit.stayDetails.bedrooms}
                            placeholder="Bedrooms"
                            onChange={handleChange} /></label>

                    <label htmlFor="">Beds
                        <input type="number"
                            id="beds"
                            name="beds"
                            value={stayToEdit.stayDetails.beds}
                            placeholder="Beds"
                            onChange={handleChange} /></label>

                    <label htmlFor="">Shared bath
                        <input type="number"
                            id="sharedBath"
                            name="sharedBath"
                            value={stayToEdit.stayDetails.sharedBath}
                            placeholder="Shared bath"
                            onChange={handleChange} /></label>

                    <label htmlFor="">Price
                        <input type="number"
                            id="price"
                            name="price"
                            value={stayToEdit.price}
                            placeholder="Price"
                            onChange={handleChange} /></label>

                    <label htmlFor="propertyType">Property type
                        <select name="type" id="propertyType" onChange={handleChange}>
                            <option value="House">House</option>
                            <option value="Private room">Private room</option>
                            <option value="Entire home/apt">Entire home/apt</option>
                        </select>
                    </label>

                    <label htmlFor="">Allow pets?
                        <input type="checkbox"
                            name="allowPets"
                            id="allowPets"
                            onChange={handleChange}
                            value={stayToEdit.stayDetails.allowPets} /></label>
                </div>
            </label>

            <label htmlFor="">Labels</label>

            <MultiLabelsSelect handleSelectChange={handleLablesSelectChange} />

            <label htmlFor="">Amenites</label>

            <MultiAmenitiesSelect handleSelectChange={handleAmenitiesSelectChange} />

            <label htmlFor="">Summary</label>
            <textarea value={stayToEdit.summary} placeholder="Write somthing on your stay" name="summary" id="summary" onChange={handleChange} cols="30" rows="4"></textarea>

            <button onClick={() => { onSubmit() }} className="edit-btn">{stayToEdit._id ? 'Save' : 'Add'}</button>

        </section>
    )
}