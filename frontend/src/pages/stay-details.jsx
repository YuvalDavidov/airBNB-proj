import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router'
import { CgAwards, CgScreen } from 'react-icons/cg';
import { VscKey } from 'react-icons/vsc';
import { GoLocation } from 'react-icons/go';
import { MdOutlineMarkChatUnread, MdSmokingRooms, MdPets } from 'react-icons/md';
import { AiOutlineWifi, AiFillStar } from 'react-icons/ai';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { TbElevator } from 'react-icons/tb';
import { StayMap } from "../cmps/stay-map";
import { StayDatePicker } from "../cmps/stay-date-picker";
import { stayService } from "../services/stay.service.local";
import { showErrorMsg } from "../services/event-bus.service";
import { GradientButton } from "../cmps/gradient-button";

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const serviceFee = 18


export function StayDetails() {

    const [stay, setStay] = useState(null)
    const [pickedDate, setPickedDate] = useState({ startDate: new Date(), endDate: null })
    const [datePickerModual, setDatePickerModual] = useState(false)
    const [guestsModual, setGuestsModual] = useState(false)
    const [guestsAmount, setGuestsAmount] = useState({ total: 1, adults: 1, children: 0, infants: 0, pets: 0 })
    const { stayId } = useParams()
    const navigate = useNavigate()



    useEffect(() => {
        stayService.getById(stayId)
            .then(setStay)
    }, [])

    useEffect(() => {
        if (!stay) return
        const reserve = document.querySelector('.reserve')
        const modual = document.querySelector('.reserve-module')

        const modualObserver = new IntersectionObserver(onModualObserver, {
            margin: '10px'
        })

        modualObserver.observe(reserve)

        function onModualObserver(entries) {
            entries.forEach((entry) => {

                modual.style.position = entry.isIntersecting ? 'sticky' : 'absulote'
            })
        }

    }, [stay])

    function getStayReviewRateAvg(stayReviews) {
        let sum = 0
        let count = 0

        stayReviews.forEach(review => {
            sum += review.rate
            count++
        })
        const avg = sum / count
        return avg
    }

    function handleGuestsAmount(type, diff) {
        let cloneState = { ...guestsAmount }
        if (cloneState.adults === 1 && type === 'adults' && diff === -1) return
        if (cloneState[type] === 0 && type !== 'adults' && diff === -1) return
        if (type === 'pets' && !stayDetails.allowPets) return
        cloneState[type] += diff
        cloneState.total += diff
        setGuestsAmount(cloneState)
    }

    function updateDate(dates) {
        setPickedDate(dates)
    }

    function onCheckAvailabilty() {
        const { adults, children, infants, pets } = guestsAmount
        const { startDate, endDate } = pickedDate
        if (endDate === null) return showErrorMsg('you need to pick a cheack out date')
        navigate(`/book/?stayId=${stayId}&adultsAmount=${adults}&childrenAmount=${children}&infantsAmount=${infants}&petsAmount=${pets}&startDate=${startDate}&endDate=${endDate}`)
    }

    function getDaysCalculate() {
        const { startDate, endDate } = pickedDate
        let start = new Date(startDate).getTime()
        let end = new Date(endDate).getTime()
        let diffInTime = end - start
        const diffInDays = diffInTime / (1000 * 3600 * 24)

        return diffInDays + 1
    }

    function handleModuls() {
        if (guestsModual) setGuestsModual(false)
        if (datePickerModual) setDatePickerModual(false)
    }

    if (!stay) return <div>Loading...</div>
    const { name, reviews, loc, imgUrls, subTitle, host, stayDetails, price } = stay
    return (
        <section className="stay-details">
            <h2>{name}</h2>
            <div className="stay-mini-sumerry">
                <div>
                    <span> <AiFillStar /> {getStayReviewRateAvg(stay.reviews)}</span>
                    <span className="dote">•</span>
                    <span><a href="#reviews">{reviews.length} reviews</a></span>
                    <span className="dote">•</span>
                    <a href="#map">{loc.address}</a>,
                    <a href="#map"> {loc.city}</a>,
                    <a href="#map"> {loc.country}</a>

                </div>
                <div className="share-save-btns">
                    <button>share</button>
                    <button>save</button>
                </div>
            </div>

            <article className="imgs-grid">
                <img className="first" src={imgUrls[0]} />
                <img src={imgUrls[1]} />
                <img src={imgUrls[2]} />
                <img src={imgUrls[3]} />
                <img src={imgUrls[4]} />

                <button>show all photos</button>
            </article>

            <article className="stay-ditails-full">
                <section className="ditails">
                    <div className="ditails-header">
                        <div>

                            <h4>{subTitle}  hosted by {host.fullname}</h4>
                            <p>
                                <span>{stayDetails.guests} Guests</span>
                                <span className="dote">•</span>
                                <span>{stayDetails.bedrooms} Bedrooms</span>
                                <span className="dote">•</span>
                                <span>{stayDetails.beds} Beds</span>
                                <span className="dote">•</span>
                                <span>{stayDetails.sharedBath} Shared bath</span>
                            </p>
                        </div>
                        <img src={host.imgUrl} />
                    </div>
                    <hr />
                    <div className="special-preks">
                        {host.isSuperHost ?
                            <div className="preks">
                                <CgAwards />
                                <div className="container">

                                    <h4>{host.fullname} is a SupreHost</h4>
                                    <span>
                                        Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
                                    </span>
                                </div>
                            </div> : ''}
                        <br />
                        <div className="preks">
                            <VscKey />
                            <div className="container">
                                <h4>Great check-in experience</h4>
                                <span>
                                    100% of recent guests gave the check-in process a 5-star rating.
                                </span>
                            </div>
                        </div>
                        <br />
                        <div className="preks">
                            <GoLocation />
                            <div className="container">
                                <h4>Great location</h4>
                                <span>
                                    90% of recent guests gave the location a 5-star rating.
                                </span>
                            </div>
                        </div>
                        <br />
                        <div className="preks">
                            <MdOutlineMarkChatUnread />
                            <div className="container">
                                <h4>Great communication</h4>
                                <span>
                                    100% of recent guests rated Marián 5-star in communication.
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="summery">{stay.summary}</div>
                    <hr />

                    <article className="stay-amenities">
                        <h4>What this place offers</h4>
                        <div className="amenities-container">
                            <section className="wifi">
                                <AiOutlineWifi />
                                <span>Wifi</span>
                            </section>

                            <section className="TV">
                                <CgScreen />
                                <span>TV</span>
                            </section>

                            <section className="Kitchen">
                                <GiForkKnifeSpoon />
                                <span>Kitchen</span>
                            </section>

                            <section className="Smoking">
                                <MdSmokingRooms />
                                <span>Smoking Allowed</span>
                            </section>

                            <section className="Peting">
                                <MdPets />
                                <span>Peting Allowed</span>
                            </section>

                            <section className="Elevator">
                                <TbElevator />
                                <span>Elevator</span>
                            </section>

                        </div>
                    </article>

                </section>

                <section className="reserve">
                    <article className="reserve-module">
                        <div className="top">
                            <div className="price flex">
                                <h3> ₪ {price} </h3>
                                <span> night</span>
                            </div>

                            <div className="flex">
                                <h3> <AiFillStar /> {getStayReviewRateAvg(reviews)}</h3>
                                <span className="dote">•</span>
                                <span><a href="#reviews">{reviews.length} reviews</a></span>
                            </div>
                        </div>

                        <div className="reserve-date-guests">
                            <div onClick={() => { setDatePickerModual(!datePickerModual) }} className="start-date">
                                <span>check in</span> <span>{pickedDate.startDate.getDate()},{month[pickedDate.startDate.getMonth()]}</span>
                            </div>
                            <div onClick={() => { setDatePickerModual(!datePickerModual) }} className="end-date">
                                <span>check out</span> <span>{!pickedDate.endDate ? '' : <span> {pickedDate.endDate.getDate()},{month[pickedDate.endDate.getMonth()]}</span>}</span>
                            </div>

                            <div onClick={() => { setGuestsModual(!guestsModual) }} className="guests">
                                guests {guestsAmount.total}
                            </div>
                        </div>
                        <div className={`date-picker ${datePickerModual ? '' : 'close'}`}>
                            <StayDatePicker updateDate={updateDate} setDatePickerModual={setDatePickerModual} />
                        </div>
                        <section className={`guests-modual ${guestsModual ? '' : 'close'}`}>
                            <div className="flex guest-line-filter">
                                <div className="flex column">
                                    <span className="guest-main-text">Adults</span>
                                    <span className="ff-cereal-book fs14 light-color">Ages 13 or above..</span>
                                </div>
                                <span className="flex align-center">
                                    <button onClick={() => { handleGuestsAmount('adults', - 1) }}>-</button>
                                    {guestsAmount.adults}
                                    <button onClick={() => { handleGuestsAmount('adults', + 1) }}>+</button>
                                </span>
                            </div>
                            <div className="flex guest-line-filter">
                                <div className="flex column">
                                    <span className="guest-main-text">Children</span>
                                    <span className="ff-cereal-book fs14 light-color">Ages 2-12</span>
                                </div>
                                <span className="flex align-center">
                                    <button onClick={() => { handleGuestsAmount('children', - 1) }} >-</button>
                                    {guestsAmount.children}
                                    <button onClick={() => { handleGuestsAmount('children', + 1) }}>+</button>
                                </span>
                            </div>
                            <div className="flex guest-line-filter">
                                <div className="flex column">
                                    <span className="guest-main-text">Infants</span>
                                    <span className="ff-cereal-book fs14 light-color">Under 2</span>
                                </div>
                                <span className="flex align-center">
                                    <button onClick={() => { handleGuestsAmount('infants', - 1) }} >-</button>
                                    {guestsAmount.infants}
                                    <button onClick={() => { handleGuestsAmount('infants', + 1) }}>+</button>
                                </span>
                            </div>
                            <div className="flex guest-line-filter">
                                <span className="guest-main-text">Pets</span> <span className="flex align-center">
                                    <button className={`${stayDetails.allowPets ? '' : 'not'}`} onClick={() => { handleGuestsAmount('pets', - 1) }} >-</button>
                                    {guestsAmount.pets}
                                    <button className={`${stayDetails.allowPets ? '' : 'not'}`} onClick={() => { handleGuestsAmount('pets', + 1) }}>+</button>
                                </span>
                            </div>
                        </section>
                        <GradientButton onClickBtn={() => { onCheckAvailabilty() }} label={'Check availabilty'} className={"reserve-btn"} />

                        {pickedDate.endDate ? (<div className="stay-price">

                            <h3>Price details</h3>
                            <div className="price-details">
                                <div> ₪ {stay.price} x {getDaysCalculate()}</div>
                                <div>₪ {stay.price * getDaysCalculate()}</div>
                            </div>
                            <div className="service-fee">
                                <div>Service fee</div>
                                <div>₪ {serviceFee}</div>
                            </div>
                            <hr />
                            <div className="total">
                                <div>Total</div>
                                <div> ₪ {serviceFee + (stay.price * getDaysCalculate())}</div>
                            </div>
                        </div>) : ''}

                    </article>

                </section>
            </article>

            <hr />
            <section id="reviews" className="reviews">
                <h2>
                    <span> <AiFillStar /> {getStayReviewRateAvg(reviews)}</span>
                    <span className="dote">•</span>
                    <span>{reviews.length} reviews</span>
                </h2>
                <div className="reviews-list">
                    {reviews.map(review => {
                        return <li key={review.id}>
                            <div className="review-user">
                                <img src={review.by.imgUrl} />
                                <h4>{review.by.fullname}</h4>
                                <p>{review.createdAt}</p>
                            </div>
                            <div className="txt">
                                {review.txt}
                            </div>
                        </li>
                    })}
                </div>

            </section>

            <hr />

            <div id="map" className="map">
                <h4>Where you'll be</h4>
                <p>{loc.city}, {loc.country}, {loc.address}</p>

                <StayMap stayLoc={loc} />
            </div>

        </section>
    )
}
