import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';
import { SlDiamond } from 'react-icons/sl';
import { stayService } from "../services/stay.service.local";
import { AiFillStar } from "react-icons/ai";

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const serviceFee = 18

export function BookStay() {
    const [order, setOrder] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    useEffect(() => {
        getOrderPickes()
    }, [])

    function getOrderPickes() {
        let newOrder = {
            stayId: '',
            adultsAmount: '',
            childrenAmount: '',
            infantsAmount: '',
            petsAmount: '',
            startDate: '',
            endDate: ''
        }
        for (const field in newOrder) {
            newOrder[field] = searchParams.get(field)
        }
        stayService.getById(newOrder.stayId)
            .then((stay) => {
                newOrder.stay = stay
                setOrder(newOrder)
            })
    }

    function getGuestsAmount() {
        let sum = 0
        sum += +order.adultsAmount
        sum += +order.childrenAmount
        sum += +order.infantsAmount

        return sum
    }

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

    function getDaysCalculate() {
        let start = new Date(startDate).getTime()
        let end = new Date(endDate).getTime()
        let diffInTime = end - start
        const diffInDays = diffInTime / (1000 * 3600 * 24)

        return diffInDays
    }

    if (!order) return <div>Somthing whent wrong with the order</div>

    const { stay, startDate, endDate, stayId } = order

    return (
        <section className="book main-layout">
            <header>
                <button onClick={() => navigate(`/details/${stayId}`)}> <FaArrowLeft /> </button>
                <h1>Requset to book</h1>
            </header>

            <section className="main-aria">

                <section className="order-details">
                    <div className="rare-find">
                        <div>
                            <h4>this is a rare find</h4>
                            <div>{stay.host.fullname} place is usually booked.</div>
                        </div>
                        <div><SlDiamond /></div>
                    </div>

                    <div className="trip">
                        <h1>Your trip</h1>

                        <div className="dates">
                            <span>Dates</span>
                            <div>
                                {new Date(startDate).getDate()},{month[new Date(startDate).getMonth()]}
                                -
                                {new Date(endDate).getDate()},{month[new Date(endDate).getMonth()]}
                            </div>
                        </div>

                        <div className="guests">
                            <span>Guests</span>
                            <div>{getGuestsAmount()} guests</div>
                        </div>
                    </div>
                    <hr />

                </section>

                <section className="stay-price-details">
                    <div className="stay">
                        <img src={stay.imgUrls[0]} />

                        <div className="stay-details">
                            <span>{stay.name}</span>
                            <div>
                                <span> <AiFillStar /> {getStayReviewRateAvg(stay.reviews)}</span>
                                <span className="dote">.</span>
                                <span>{stay.reviews.length} reviews</span>
                            </div>
                        </div>

                    </div>
                    <hr />

                    <div className="stay-price">

                        <h3>Price details</h3>
                        <div className="price-details">
                            <div>  {stay.price} x {getDaysCalculate()}</div>
                            <div>{stay.price * getDaysCalculate()}</div>
                        </div>
                        <div className="service-fee">
                            <div>Service fee</div>
                            <div>{serviceFee}</div>
                        </div>
                        <hr />
                        <div className="total">
                            <div>Total</div>
                            <div>{serviceFee + (stay.price * getDaysCalculate())}</div>
                        </div>
                    </div>
                </section>

            </section>

        </section>
    )
}