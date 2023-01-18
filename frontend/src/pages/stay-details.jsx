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

export function StayDetails() {

    const [stay, setStay] = useState(null)

    console.log(stay);

    useEffect(() => {
        setStay(stays[0])
    }, [])

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
                        <span><a href="#">{stay.reviews.length} reviews</a></span>
                        <span className="dote">.</span>
                        <a href="">{stay.loc.address}</a>,
                        <a href="">{stay.loc.city}</a>,
                        <a href="">{stay.loc.country}</a>


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

                    <article className="reserve-module">pipi</article>
                </article>

                <hr />
                <section className="reviews">
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

                <div className="map">
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