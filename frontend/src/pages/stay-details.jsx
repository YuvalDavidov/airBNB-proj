import { useEffect } from "react"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CgAwards, CgScreen } from 'react-icons/cg';
import { VscKey } from 'react-icons/vsc';
import { GoLocation } from 'react-icons/go';
import { MdOutlineMarkChatUnread, MdSmokingRooms, MdPets } from 'react-icons/md';
import { AiOutlineWifi, AiFillStar } from 'react-icons/ai';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { TbElevator } from 'react-icons/tb';
import { BsDot } from 'react-icons/bs';
import { StayMap } from "../cmps/stay-map";
import { StayDatePicker } from "../cmps/stay-date-picker";

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function StayDetails() {

    const [stay, setStay] = useState(null)
    const [datePickerModual, setDatePickerModual] = useState(false)
    const [pickedDate, setPickedDate] = useState({ startDate: new Date(), endDate: null })
    const [guestsModual, setGuestsModual] = useState(false)
    const [adultsAmount, setAdultsAmount] = useState(1)

    console.log(pickedDate);

    useEffect(() => {
        setStay(stays[0])

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

    if (!stay) return <div>fuck you</div>
    return (
        <div className="stay-details">
            {stay && <section>
                <h2>{stay.name}</h2>
                <div className="stay-mini-title">
                    <div>
                        <span> <AiFillStar /> {getStayReviewRateAvg(stay.reviews)}</span>
                        <span className="dote">.</span>
                        <span><a href="#reviews">{stay.reviews.length} reviews</a></span>
                        <span className="dote">.</span>
                        <a href="#map">{stay.loc.address}</a>,
                        <a href="#map"> {stay.loc.city}</a>,
                        <a href="#map"> {stay.loc.country}</a>


                    </div>
                    <div className="share-save-btns">
                        <button>share</button>
                        <button>save</button>
                    </div>
                </div>
                <article className="imgs-grid">
                    <img className="first" src={stay.imgUrls[0]} />
                    <img className="second" src={stay.imgUrls[1]} />
                    <img className="third" src={stay.imgUrls[2]} />
                    <img className="fourth" src={stay.imgUrls[3]} />
                    <img className="fifth" src={stay.imgUrls[4]} />
                    <button>show all photos</button>
                </article>

                <article className="stay-ditails-full">
                    <section className="ditails">
                        <div className="ditails-header">
                            <div>

                                <h4>{stay.subTitle}  hosted by {stay.host.fullname}</h4>
                                <p>
                                    <span>{stay.stayDetails.guests} Guests</span>
                                    <span className="dote">.</span>
                                    <span>{stay.stayDetails.bedrooms} Bedrooms</span>
                                    <span className="dote">.</span>
                                    <span>{stay.stayDetails.beds} Beds</span>
                                    <span className="dote">.</span>
                                    <span>{stay.stayDetails.sharedBath} Shared bath</span>
                                </p>
                            </div>
                            <img src={stay.host.imgUrl} />
                        </div>
                        <hr />
                        <div className="special-preks">
                            {stay.host.isSuperHost ?
                                <div>
                                    <div> <CgAwards /> </div>
                                    <h4>{stay.host.fullname} is a SupreHost</h4>
                                    <span>
                                        Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
                                    </span>
                                </div> : ''}
                            <br />
                            <div>
                                <VscKey />
                                <h4>Great check-in experience</h4>
                                <span>
                                    100% of recent guests gave the check-in process a 5-star rating.
                                </span>
                            </div>
                            <br />
                            <div>
                                <GoLocation />
                                <h4>Great location</h4>
                                <span>
                                    90% of recent guests gave the location a 5-star rating.
                                </span>
                            </div>
                            <br />
                            <div>
                                <MdOutlineMarkChatUnread />
                                <h4>Great communication</h4>
                                <span>
                                    100% of recent guests rated Marián 5-star in communication.
                                </span>
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
                                <div className="price">
                                    {stay.price}
                                    <span> night</span>
                                </div>

                                <div>
                                    <span> <AiFillStar /> {getStayReviewRateAvg(stay.reviews)}</span>
                                    <span className="dote">.</span>
                                    <span><a href="#">{stay.reviews.length} reviews</a></span>
                                </div>
                            </div>

                            <div className="reserve-date-guests">
                                <div onClick={() => { setDatePickerModual(!datePickerModual) }} className="start-date">
                                    {pickedDate.startDate.getDate()},{month[pickedDate.startDate.getMonth()]}
                                </div>
                                <div onClick={() => { setDatePickerModual(!datePickerModual) }} className="end-date">
                                    {!pickedDate.endDate ? '' : <span> {pickedDate.endDate.getDate()},{month[pickedDate.endDate.getMonth()]}</span>}
                                </div>

                                <div onClick={() => { setGuestsModual(!guestsModual) }} className="guests">
                                    {adultsAmount}
                                </div>
                            </div>
                            <div className="date-picker">
                                {datePickerModual && <StayDatePicker setPickedDate={setPickedDate} setDatePickerModual={setDatePickerModual} />}
                            </div>
                            <section className={`guests-modual ${guestsModual ? '' : 'close'}`}>
                                <div>
                                    Adults <span> <button onClick={() => { setAdultsAmount(adultsAmount - 1) }} >-</button> 1 <button onClick={() => { setAdultsAmount(adultsAmount + 1) }}>+</button></span>
                                </div>
                                <div>
                                    Children <span> <button>-</button> 0 <button>+</button></span>
                                </div>
                                <div>
                                    Infants <span> <button>-</button> 0 <button>+</button></span>
                                </div>
                                <div>
                                    Pets <span> <button>-</button> 0 <button>+</button></span>
                                </div>
                            </section>
                            <button className="reserve-btn">Check availabilty</button>
                        </article>

                    </section>
                </article>

                <hr />
                <section id="reviews" className="reviews">
                    <h2>
                        <span> <AiFillStar /> {getStayReviewRateAvg(stay.reviews)}</span>
                        <span className="dote">.</span>
                        <span>{stay.reviews.length} reviews</span>
                    </h2>
                    <div className="reviews-list">
                        {stay.reviews.map(review => {
                            return <li key={review.id}>
                                <div>
                                    <img src={review.by.imgUrl} />
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
                    <p>{stay.loc.city},{stay.loc.country},{stay.loc.address}</p>

                    <StayMap stayLoc={stay.loc} />
                </div>

            </section>}
        </div>
    )
}

const stays = [
    {
        "_id": "10006546",
        "name": "Ribeira Charming Duplex",
        "subTitle": "Ribeira Charming",
        "type": "House",
        "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large",],
        "price": 80.00,
        "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto",
        "stayDetails": {
            "guests": 8,
            "bedrooms": 3,
            "beds": 3,
            "sharedBath": 1
        },
        "amenities": [
            "TV",
            "Wifi",
            "Kitchen",
            "Smoking allowed",
            "Pets allowed",
            "Elevator"
        ],
        "labels": [
            "Top of the world",
            "Trending",
            "Play",
            "Tropical"
        ],
        "host": {
            "_id": "u101",
            "isSuperHost": true,
            "fullname": "Davit Pok",
            "imgUrl": "https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg",
        },
        "loc": {
            "country": "Portugal",
            "countryCode": "PT",
            "city": "Porto",
            "address": "17 Kombo st",
            "lat": 41.150223,
            "lng": -8.629932
        },
        "reviews": [
            {
                "id": "madeId",
                "txt": "Very helpful hosts. Cooked traditional Very helpful hosts. Cooked traditional...",
                "rate": 4,
                "createdAt": "Apr 2015",
                "by": {
                    "_id": "u102",
                    "fullname": "user2",
                    "imgUrl": "https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg"
                }
            },
            {
                "id": "madeI",
                "txt": "Very helpful hosts. Cooked traditional...",
                "rate": 1,
                "createdAt": "Aug 2015",
                "by": {
                    "_id": "u102",
                    "fullname": "user2",
                    "imgUrl": "https://res.cloudinary.com/dp32ucj0y/image/upload/v1673813926/lglgsenxgbub2dwtangi.jpg"
                }
            }
        ],
        "likedByUsers": ['mini-user'] // for user-wishlist : use $in
    }
]