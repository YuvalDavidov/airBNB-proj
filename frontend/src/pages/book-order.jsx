import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { stayService } from "../services/stay.service";
import { orderService } from "../services/order.service";
import { showSuccessMsg } from "../services/event-bus.service";

import { setIsModalOpen } from "../store/user.actions";

import { GradientButton } from "../cmps/gradient-button";

import { FaArrowLeft } from 'react-icons/fa';
import { SlDiamond } from 'react-icons/sl';
import { AiFillStar } from "react-icons/ai";

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const serviceFee = 18

export function BookStay() {
    const { user } = useSelector((storeState) => storeState.userModule)
    const { isMobile } = useSelector((storeState) => storeState.systemModule)
    const [order, setOrder] = useState(null)
    const [isOrderDone, setIsOrderDone] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    console.log(order);

    useEffect(() => {
        getOrderPickes()

        if (!order) return

    }, [])

    async function getOrderPickes() {
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
        const currStay = await stayService.getById(newOrder.stayId)
        newOrder.stay = currStay
        setOrder(newOrder)
        // stayService.getById(newOrder.stayId)
        //     .then((stay) => {
        //         setOrder(newOrder)
        //     })
    }

    function getGuestsAmount() {
        let sum = 0
        sum += +order.adultsAmount
        sum += +order.childrenAmount
        sum += +order.infantsAmount

        return sum
    }

    function getStayReviewRateAvg(stayReviews) {
        let rate = 0
        let rateCount = 0
        let sum = 0
        let count = 0

        if (stayReviews.length < 1) return '0'

        stayReviews.forEach(review => {

            for (const key in review.moreRate) {
                sum += review.moreRate[key]
                count++
            }
            rate += sum / count
            rateCount++
        })

        const avg = parseFloat(rate / rateCount).toFixed(2)
        return avg
    }

    function getDaysCalculate() {
        let start = new Date(startDate).getTime()
        let end = new Date(endDate).getTime()
        let diffInTime = end - start
        const diffInDays = diffInTime / (1000 * 3600 * 24)

        return diffInDays + 1
    }

    function onOrder() {
        let orderToSave = orderService.getEmptyOrder()
        orderToSave.aboutOrder = order
        orderToSave.aboutOrder.totalPrice = stay.price * getDaysCalculate()
        orderToSave.aboutOrder.bookDate = Date.now()
        orderToSave.aboutOrder.status = 'Pending'
        orderToSave.aboutUser = { id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
        orderService.save(orderToSave)
        showSuccessMsg('Order has been made')
        setIsOrderDone(true)
    }

    if (!order) return <div>Somthing whent wrong with the order</div>

    const { stay, startDate, endDate, stayId } = order

    return (<>
        {isMobile ? (
            <section className="book">
                <header>
                    <button onClick={() => navigate(`/details/${stayId}`)}> <FaArrowLeft /> </button>
                    <h3>Confirm and pay</h3>
                </header>

                <div className="stay">
                    <img src={stay.imgUrls[0]} />

                    <div className="stay-details">
                        <div className="flex column">
                            <small>{stay.type}</small>
                            <span>{stay.name}</span>
                        </div>
                        <div>
                            <span> <AiFillStar /> {getStayReviewRateAvg(stay.reviews)}</span>
                            <span className="dote">.</span>
                            <span>({stay.reviews.length}) </span>
                        </div>
                    </div>

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

                <div className="stay-price">

                    <h3>Price details</h3>
                    <div className="price-details">
                        <div> $ {stay.price} x {getDaysCalculate()}</div>
                        <div>$ {(stay.price * getDaysCalculate()).toLocaleString('en-US')}</div>
                    </div>
                    <div className="service-fee">
                        <div>Service fee</div>
                        <div>$ {serviceFee}</div>
                    </div>
                    <div className="total">
                        <div>Total</div>
                        <div> $ {(serviceFee + (stay.price * getDaysCalculate())).toLocaleString('en-US')}</div>
                    </div>
                </div>

                {user ?
                    (!isOrderDone ? <GradientButton onClickBtn={() => { onOrder() }} label={'Confirm'} className={"reserve-btn"} /> : <GradientButton label={'Tnx for ordering!'} className={"reserve-btn"} />)
                    : <GradientButton onClickBtn={() => { setIsModalOpen(true) }} label={'Login'} className={"reserve-btn"} />}

            </section>
        )
            : (<section className="book main-layout">
                <header>
                    <button onClick={() => navigate(`/details/${stayId}`)}> <FaArrowLeft /> </button>
                    <h1>Requset to book</h1>

                </header>

                <section className="main-area">

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


                        {user ?
                            (!isOrderDone ? <GradientButton onClickBtn={() => { onOrder() }} label={'Confirm'} className={"reserve-btn"} /> : <GradientButton label={'Tnx for ordering!'} className={"reserve-btn"} />)
                            : <GradientButton onClickBtn={() => { setIsModalOpen(true) }} label={'Login'} className={"reserve-btn"} />}
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
                                <div> $ {stay.price.toLocaleString('en-US')} x {getDaysCalculate()}</div>
                                <div>$ {(stay.price * getDaysCalculate()).toLocaleString('en-US')}</div>
                            </div>
                            <div className="service-fee">
                                <div>Service fee</div>
                                <div>$ {serviceFee}</div>
                            </div>
                            <hr />
                            <div className="total">
                                <div>Total</div>
                                <div> $ {(serviceFee + (stay.price * getDaysCalculate())).toLocaleString('en-US')}</div>
                            </div>
                        </div>
                    </section>

                </section>

            </section>)}



    </>)
}