import { useEffect } from "react"
import { useState } from "react"
import { Await, useNavigate, useParams } from "react-router"
import { stayService } from "../services/stay.service"
import { uploadService } from "../services/upload.service"
import { MultiAmenitiesSelect } from "./multi-amenities-select"
import { MultiLabelsSelect } from "./multi-select-lables"
import { showErrorMsg } from "../services/event-bus.service"
import axios from "axios"
import { IconContext } from "react-icons"
import { ImCloudUpload } from "react-icons/im"


export function StayEdit() {

    const [errs, setErrs] = useState({
        nameErr: '',
        cityErr: '',
        countryErr: '',
        addressErr: '',
        summaryErr: '',
        imgUrlsErr: '',
        priceErr: '',
        guestsErr: '',
        bedsErr: '',
        labelsErr: '',
        amenitesErr: '',
    })
    const [stayToEdit, setStayToEdit] = useState(stayService.getEmptyStay())
    const navigate = useNavigate()
    const { stayId } = useParams()
    console.log(stayToEdit);
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
                if (value < 0) return
                break;
            case 'checkbox':
                value = checked

            case 'text':
                value = value.charAt(0).toUpperCase() + value.slice(1)
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
        uploadService.uploadMany(ev)
            .then((imgsUrl) => {
                let imgsArr = imgsUrl.map(img => img.url)
                setStayToEdit((prevStay) => ({ ...prevStay, imgUrls: [...prevStay.imgUrls, ...imgsArr] }))
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
        let currErrs = {
            nameErr: stayToEdit.name.length < 5 ? 'Stay name is to short. need at least 5 letters' : '',
            cityErr: stayToEdit.loc.city.length < 3 ? 'stay City name is too short. need at least 3 letters' : '',
            countryErr: stayToEdit.loc.country.length < 5 ? 'stay Country address is too short. need at least 5 letters' : '',
            addressErr: stayToEdit.loc.address.length < 5 ? 'stay Address is too short. need at least 5 letters' : '',
            summaryErr: stayToEdit.summary.length < 15 ? 'stay Summary is too short. need at least 15 letters' : '',
            imgUrlsErr: stayToEdit.imgUrls.length <= 4 ? 'stay Images is too short. need at least 5 images' : '',
            priceErr: stayToEdit.price < 100 ? 'stay Price is too Low.' : '',
            guestsErr: stayToEdit.stayDetails.guests <= 0 ? 'stay Guests amount is too low. need at 1 guest' : '',
            bedsErr: stayToEdit.stayDetails.beds <= 0 ? 'stay Beds amount is too low. need at 1 bed' : '',
            labelsErr: stayToEdit.labels <= 0 ? 'stay Lables amount is too low. need at 1 lable' : '',
            amenitesErr: stayToEdit.amenities <= 0 ? 'stay Amenites amount is too low. need at 1 amenite' : '',
        }
        setErrs(currErrs)
        let arr = Object.values(currErrs)

        let isNotCopmleted = arr.some(err => err)
        if (isNotCopmleted) return

        const loc = await onGetLoc(stayToEdit.loc.address, stayToEdit.loc.country, stayToEdit.loc.city)
        let stayToSave = { ...stayToEdit }
        stayToSave.loc.lat = loc.lat
        stayToSave.loc.lng = loc.lng
        stayToSave.createdAt = new Date()

        const savedStay = await stayService.save(stayToSave)
        navigate('/')
    }

    return (
        <section className="edit-stay">
            <label htmlFor="name">Name</label>
            <input type="text"
                id="name"
                name="name"
                value={stayToEdit.name}
                placeholder="Name"
                onChange={handleChange} />
            <p>{errs.nameErr}</p>

            <label htmlFor="">Address</label>
            <div className="address">

                <input type="text"
                    id="city"
                    name="city"
                    value={stayToEdit.loc.city}
                    placeholder="City"
                    onChange={handleChange} />
                <p>{errs.cityErr}</p>


                <input type="text"
                    id="country"
                    name="country"
                    value={stayToEdit.loc.country}
                    placeholder="Country"
                    onChange={handleChange} />
                <p>{errs.countryErr}</p>


                <input type="text"
                    id="address"
                    name="address"
                    value={stayToEdit.loc.address}
                    placeholder="Street"
                    onChange={handleChange} />
                <p>{errs.addressErr}</p>

            </div>


            <div className="uploader">
                <IconContext.Provider
                    value={{ className: "my-icons" }}>
                    <ImCloudUpload />
                </IconContext.Provider>
                <div className="grid">
                    <a href="">click to upload</a>
                    <small>you can choose many images</small>
                </div>

                <input type="file" className="file" multiple accept="true" onChange={(event) => { onUploadImg(event) }} />
            </div>



            <div className="img-container">
                {stayToEdit.imgUrls.length > 0 ?
                    stayToEdit.imgUrls.map((url) => {
                        return <div className="imgUrl" key={url}><img src={url} /> <button onClick={() => { onRemoveImg(url) }}>x</button> </div>
                    }) : ''}
            </div>
            <p>{errs.imgUrlsErr}</p>

            <label htmlFor="">Stay details </label>
            <div className="edit-stay-details">
                <label htmlFor="">Guests
                    <input type="number"
                        id="guests"
                        name="guests"
                        value={stayToEdit.stayDetails.guests}
                        placeholder="Guests"
                        onChange={handleChange} />
                    <p>{errs.guestsErr}</p>
                </label>

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
                        onChange={handleChange} />
                    <p>{errs.bedsErr}</p>
                </label>

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
                        onChange={handleChange} />
                    <p>{errs.priceErr}</p>
                </label>

                <label htmlFor="propertyType">Property type
                    <select name="type" id="propertyType" onChange={handleChange}>
                        <option value="House">House</option>
                        <option value="Private room">Private room</option>
                        <option value="Entire home/apt">Entire home/apt</option>
                    </select>
                </label>

            </div>
            <label htmlFor="">Allow pets?
                <input type="checkbox"
                    name="allowPets"
                    id="allowPets"
                    onChange={handleChange}
                    value={stayToEdit.stayDetails.allowPets} /></label>

            <div className="edit-labels-container">

                <label htmlFor="">Labels

                    <MultiLabelsSelect handleSelectChange={handleLablesSelectChange} />
                    <p>{errs.labelsErr}</p>
                </label>

                <label htmlFor="">Amenites

                    <MultiAmenitiesSelect handleSelectChange={handleAmenitiesSelectChange} />
                    <p>{errs.labelsErr}</p>

                </label>
            </div>

            <label htmlFor="">Summary</label>
            <textarea value={stayToEdit.summary} placeholder="Write somthing on your stay" name="summary" id="summary" onChange={handleChange} cols="30" rows="4"></textarea>

            <p>{errs.summaryErr}</p>

            <button onClick={() => { onSubmit() }} className="edit-btn">{stayToEdit._id ? 'Save' : 'Add'}</button>

        </section>
    )
}