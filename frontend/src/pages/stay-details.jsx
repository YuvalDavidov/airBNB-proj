import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router'
import { useSelector } from "react-redux";

import { StayMap } from "../cmps/stay-map";
import { StayDatePicker } from "../cmps/stay-date-picker";
import { GradientButton } from "../cmps/gradient-button";
import { ImageSlider } from "../cmps/image-slider";

import { stayService } from "../services/stay.service.local";
import { showErrorMsg } from "../services/event-bus.service";

import { addToWishlist, removeFromWishlist, setIsModalOpen, setIsSignup } from '../store/user.actions'
import { toggleInDetails } from "../store/stay.actions";

import { CgAwards, CgScreen } from 'react-icons/cg';
import { VscKey } from 'react-icons/vsc';
import { GoLocation } from 'react-icons/go';
import { MdOutlineMarkChatUnread, MdSmokingRooms, MdPets, MdOutlineArrowBackIosNew } from 'react-icons/md';
import { AiOutlineWifi, AiFillStar } from 'react-icons/ai';
import { RiArrowRightSLine } from 'react-icons/ri';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { TbElevator, TbGridDots } from 'react-icons/tb';
import { IconContext } from "react-icons";
import { TiHeartFullOutline } from "react-icons/ti";

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const serviceFee = 18

export function StayDetails() {

    const [stay, setStay] = useState(null)
    const [pickedDate, setPickedDate] = useState({ startDate: new Date(), endDate: null })
    const [datePickerModal, setDatePickerModal] = useState(false)
    const [guestsModal, setGuestsModal] = useState(false)
    const [imgsModal, setImgsModal] = useState(false)
    const [guestsAmount, setGuestsAmount] = useState({ total: 1, adults: 1, children: 0, infants: 0, pets: 0 })
    const user = useSelector((storeState) => storeState.userModule.user)
    const { isMobile } = useSelector((storeState) => storeState.systemModule)
    const { stayId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        toggleInDetails(true)
        loadStay()
    }, [])

    useEffect(() => {
        if (!stay) return
        if (isMobile) return

        const imgGrid = document.querySelector('.imgs-grid')
        const reserveBtn = document.getElementById('reserve-btn')

        const header = document.querySelector('.details-header-bar')
        const headerBtn = document.querySelector('.reserve-btn-header')

        const galleryObserver = new IntersectionObserver(headerUpdate)

        const reserveObserver = new IntersectionObserver(reserveUpdate, { rootMargin: '-80px 0px 0px' })

        galleryObserver.observe(imgGrid)
        reserveObserver.observe(reserveBtn)

        function reserveUpdate(entries) {
            entries.forEach((entry) => {
                headerBtn.style.display = entry.isIntersecting ? 'none' : 'flex'

            })
        }

        function headerUpdate(entries) {
            entries.forEach((entry) => {
                header.style.display = entry.isIntersecting ? 'none' : 'grid'
            })
        }


    }, [stay, isMobile])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (error) {

        }

    }

    function getStayReviewRateAvg(stayReviews) {
        let rate = 0
        let rateCount = 0
        let sum = 0
        let count = 0

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
        if (endDate === null) return setDatePickerModal(true)
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
        if (guestsModal) setGuestsModal(false)
        if (datePickerModal) setDatePickerModal(false)
    }

    function onToggleWishlist(stayId) {
        if (!user) {
            setIsSignup(false)
            setIsModalOpen(true)
        }
        if (user.wishlist.includes(stayId)) {
            removeFromWishlist(stayId)
        } else {
            addToWishlist(stayId)
        }
    }

    function getReviewsRateByType(type) {
        let sum = 0
        let count = 0
        stay.reviews.forEach((review) => {
            sum += review.moreRate[type]
            count++
        })
        const avg = parseFloat(sum / count).toFixed(1)
        return avg
    }

    function getSixReviews() {
        let stayReviews = reviews.map(review => {
            return <li key={review.id} className="review">
                <div className="review-user">
                    <img src={review.by.imgUrl} />
                    <div>
                        <h4>{review.by.fullname}</h4>
                        <p>{new Date(review.createdAt).getFullYear()}/{month[new Date(review.createdAt).getMonth()]}</p>
                    </div>
                </div>
                <div className="txt">
                    {review.txt}
                </div>
                {review.txt.length > 50 && <div className="show"><a href="">show more </a> {<RiArrowRightSLine />}</div>}
            </li>
        })

        return stayReviews.splice(0, 5)
    }

    if (!stay) return <div>Loading...</div>
    const { name, reviews, loc, imgUrls, subTitle, host, stayDetails, price } = stay
    return (<>

        {!isMobile && (<article className="details-header-bar">

            <div className="details-header-bar-container">

                <div className="details-header-bar-container-a-links">

                    <a href="#imgs-grid">Photos</a>
                    <a href="#amenities">Amenities</a>
                    <a href="#reviews">Reviews</a>
                    <a href="#map">Location</a>
                </div>


                <div className="reserve-btn-header">
                    <div className="reserve-btn-header-details">
                        <div>
                            <span> $ {price.toLocaleString('en-US')}</span>  night

                        </div>

                        <div className="header-review flex align-center">
                            <AiFillStar /> {reviews.length > 0 ? getStayReviewRateAvg(reviews) : '0'}
                            <span className="dote">•</span>
                            <span><a href="#reviews">{reviews.length} reviews</a></span>

                        </div>
                    </div>

                    <GradientButton onClickBtn={() => { onCheckAvailabilty() }} label={'Reserve'} className={"reserve-btn"} />
                </div>

            </div>
        </article>
        )}

        {isMobile && (<article className="details-header-mobile">
            <div className="home" onClick={() => { navigate('/') }} >
                <button>
                    <MdOutlineArrowBackIosNew />
                </button>
                <span>Homes</span>
            </div>
            <div className="share-save-btns">
                <IconContext.Provider
                    value={{ className: `heart-btn ${user?.wishlist.includes(stay._id) && 'is-active'}` }}
                >
                    <div className="save-btn flex align-center" onClick={() => onToggleWishlist(stay._id)}>
                        <TiHeartFullOutline />
                    </div>
                </IconContext.Provider>
            </div>
        </article>)}

        <section className="stay-details">

            <article className={`imgs-modal ${imgsModal ? 'open' : 'close'}`}>
                <button onClick={() => { setImgsModal(false) }} >
                    <MdOutlineArrowBackIosNew />
                </button>
                {stay.imgUrls.map((img, idx) => {
                    return <img key={idx} src={imgUrls[idx]} />
                })}

            </article>

            {!isMobile && (<>
                <h2>{name}</h2>
                <div className="stay-mini-sumerry align-center">
                    <div className="flex align-center">
                        {reviews.length > 0 && <><span> <AiFillStar /> {getStayReviewRateAvg(reviews)}</span>  <span className="dote">•</span></>}
                        <span><a href="#reviews">{reviews.length} reviews</a></span>
                        <span className="dote">•</span>
                        <a href="#map">{loc.address}</a>,
                        <a href="#map"> {loc.city}</a>,
                        <a href="#map"> {loc.country}</a>

                    </div>
                    <div className="share-save-btns">
                        <IconContext.Provider
                            value={{ className: `heart-btn ${user?.wishlist.includes(stay._id) && 'is-active'}` }}
                        >
                            <div className="save-btn flex align-center" onClick={() => onToggleWishlist(stay._id)}>
                                <TiHeartFullOutline />  save
                            </div>
                        </IconContext.Provider>
                    </div>
                </div>

            </>)}

            {isMobile ?
                (<div onClick={() => { setImgsModal(true) }}  ><ImageSlider imgs={stay.imgUrls} /></div>)
                : (<article id="imgs-grid" className="imgs-grid">
                    <img onClick={() => { setImgsModal(true) }} className="first" src={imgUrls[0]} />
                    <img onClick={() => { setImgsModal(true) }} src={imgUrls[1]} />
                    <img onClick={() => { setImgsModal(true) }} src={imgUrls[2]} />
                    <img onClick={() => { setImgsModal(true) }} src={imgUrls[3]} />
                    <img onClick={() => { setImgsModal(true) }} src={imgUrls[4]} />

                    <button onClick={() => { setImgsModal(true) }} className="flex align-center justify-between"> <TbGridDots /> <span>show all photos</span></button>
                </article>)
            }

            <article className="stay-details-full">
                <section className="details">


                    {isMobile && (<div>

                        <h2>{name}</h2>
                        <div className="stay-mini-sumerry align-center">
                            <div className="flex align-center">
                                <span> <AiFillStar /> {reviews.length > 0 ? getStayReviewRateAvg(reviews) : '0'}</span>
                                <span className="dote">•</span>
                                <span><a href="#reviews">{reviews.length} reviews</a></span>
                                <span className="dote">•</span>
                                <a href="#map">{loc.address}</a>,
                                <a href="#map"> {loc.city}</a>,
                                <a href="#map"> {loc.country}</a>

                            </div>
                            {/* <div className="share-save-btns">
                                <IconContext.Provider
                                    value={{ className: `heart-btn ${user?.wishlist.includes(stay._id) && 'is-active'}` }}
                                >
                                    <div className="save-btn flex align-center" onClick={() => onToggleWishlist(stay._id)}>
                                        <TiHeartFullOutline />  save
                                    </div>
                                </IconContext.Provider>
                            </div> */}
                        </div>

                    </div>)}

                    <div className="details-header">
                        <div>

                            <h4>{subTitle}  hosted by {host.fullname}</h4>
                            <p>
                                <span>{stayDetails.guests} Guests</span>
                                <span className="dote">•</span>
                                <span>{stayDetails.bedrooms} Bedrooms</span>
                                <span className="dote">•</span>
                                <span>{stayDetails.beds} Beds</span>
                                <span className="dote">•</span>
                                <span>{stayDetails.sharedBath} Bath</span>
                            </p>
                        </div>
                        <img src={host.imgUrl} />
                    </div>

                    <div className="special-preks">
                        {host.isSuperHost ?
                            <div className="preks">
                                <IconContext.Provider
                                    value={{ className: "my-icons-loc" }}>
                                    <CgAwards />
                                </IconContext.Provider>
                                <div className="container">

                                    <h4>{host.fullname} is a SupreHost</h4>
                                    <span>
                                        Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
                                    </span>
                                </div>
                            </div> : ''}
                        <br />
                        <div className="preks">
                            <IconContext.Provider
                                value={{ className: "my-icons" }}>

                                <VscKey />
                            </IconContext.Provider>
                            <div className="container">
                                <h4>Great check-in experience</h4>
                                <span>
                                    100% of recent guests gave the check-in process a 5-star rating.
                                </span>
                            </div>
                        </div>
                        <br />
                        <div className="preks">
                            <IconContext.Provider
                                value={{ className: "my-icons" }}>

                                <GoLocation />
                            </IconContext.Provider>
                            <div className="container">
                                <h4>Great location</h4>
                                <span>
                                    90% of recent guests gave the location a 5-star rating.
                                </span>
                            </div>
                        </div>
                        <br />
                        <div className="preks">
                            <IconContext.Provider
                                value={{ className: "my-icons" }}>

                                <MdOutlineMarkChatUnread />
                            </IconContext.Provider>
                            <div className="container">
                                <h4>Great communication</h4>
                                <span>
                                    100% of recent guests rated Marián 5-star in communication.
                                </span>
                            </div>
                        </div>
                    </div>

                    <div id="amenities" className="summery">{stay.summary}</div>


                    <article className="stay-amenities">
                        <h4>What this place offers</h4>
                        <div className="amenities-container">
                            <section className="wifi">
                                <IconContext.Provider
                                    value={{ className: "my-icons" }}>
                                    <AiOutlineWifi />
                                </IconContext.Provider>
                                <span>Wifi</span>
                            </section>

                            <section className="TV">
                                <IconContext.Provider
                                    value={{ className: "my-icons" }}>
                                    <CgScreen />
                                </IconContext.Provider>
                                <span>TV</span>
                            </section>

                            <section className="Kitchen">
                                <IconContext.Provider
                                    value={{ className: "my-icons" }}>

                                    <GiForkKnifeSpoon />
                                </IconContext.Provider>
                                <span>Kitchen</span>
                            </section>

                            <section className="Smoking">
                                <IconContext.Provider
                                    value={{ className: "my-icons" }}>

                                    <MdSmokingRooms />
                                </IconContext.Provider>
                                <span>Smoking Allowed</span>
                            </section>

                            <section className="Peting">
                                <IconContext.Provider
                                    value={{ className: "my-icons" }}>

                                    <MdPets />
                                </IconContext.Provider>
                                <span>Peting Allowed</span>
                            </section>

                            <section className="Elevator">
                                <IconContext.Provider
                                    value={{ className: "my-icons" }}>
                                    <TbElevator />
                                </IconContext.Provider>
                                <span>Elevator</span>
                            </section>

                        </div>
                    </article>

                </section>

                <section className="reserve">
                    {isMobile ?
                        (
                            <article className="reserve-mobile">
                                <div className="price flex mobile-details">
                                    <div className="flex justify-between price-night">
                                        <h4>${price.toLocaleString('en-US')} </h4>
                                        <span> night</span>
                                    </div>

                                    <div onClick={() => { setDatePickerModal(!datePickerModal) }} className="dates">
                                        <span>{pickedDate.startDate.getDate()}/{pickedDate.startDate.getMonth() + 1}</span>

                                        {!pickedDate.endDate ? '' : <span> -{pickedDate.endDate.getDate()}/{pickedDate.endDate.getMonth() + 1}</span>}
                                    </div>

                                </div>
                                <div className={`date-picker ${datePickerModal ? '' : 'close'}`}>
                                    <StayDatePicker updateDate={updateDate} setDatePickerModal={setDatePickerModal} />
                                </div>

                                <GradientButton onClickBtn={() => { onCheckAvailabilty() }} label={'Check availabilty'} className={"reserve-btn"} />
                            </article>
                        )
                        : (<article className="reserve-module">
                            <div className="top">
                                <div className="price flex">
                                    <h3> $ {price.toLocaleString('en-US')} </h3>
                                    <span> night</span>
                                </div>

                                <div className="flex align-center">
                                    {reviews.length > 0 && <> <AiFillStar /> {getStayReviewRateAvg(reviews)}   <span className="dote">•</span> </>}


                                    <span><a href="#reviews">{reviews.length} reviews</a></span>
                                </div>
                            </div>

                            <div className="reserve-date-guests">
                                <div onClick={() => { setDatePickerModal(!datePickerModal) }} className="start-date">
                                    <div>CHECK-IN</div> <span>{pickedDate.startDate.getDate()}/{pickedDate.startDate.getMonth() + 1}/{pickedDate.startDate.getFullYear()}</span>
                                </div>
                                <div onClick={() => { setDatePickerModal(!datePickerModal) }} className="end-date">
                                    <div>CHECK-OUT</div> {!pickedDate.endDate ? '' : <span> {pickedDate.endDate.getDate()}/{pickedDate.endDate.getMonth() + 1}/{pickedDate.endDate.getFullYear()}</span>}
                                </div>

                                <div onClick={() => { setGuestsModal(!guestsModal) }} className="guests">
                                    <div> GUESTS</div>   <span>{guestsAmount.total} guest</span>
                                </div>
                            </div>
                            <div className={`date-picker ${datePickerModal ? '' : 'close'}`}>
                                <StayDatePicker updateDate={updateDate} setDatePickerModal={setDatePickerModal} />
                            </div>
                            <section className={`guests-modal ${guestsModal ? '' : 'close'}`}>
                                <div className="flex guest-line-filter">
                                    <div className="flex column">
                                        <span className="guest-main-text">Adults</span>
                                        <span className="ff-cereal-book fs14 light-color">Ages 13 or above..</span>
                                    </div>
                                    <span className="flex align-center">
                                        <button onClick={() => { handleGuestsAmount('adults', - 1) }}>-</button>
                                        <span className="counter">{guestsAmount.adults}</span>
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
                                        <span className="counter">{guestsAmount.children}</span>
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
                                        <span className="counter">{guestsAmount.infants}</span>
                                        <button onClick={() => { handleGuestsAmount('infants', + 1) }}>+</button>
                                    </span>
                                </div>
                                <div className="flex guest-line-filter">
                                    <span className="guest-main-text">Pets</span> <span className="flex align-center">
                                        <button className={`${stayDetails.allowPets ? '' : 'not'}`} onClick={() => { handleGuestsAmount('pets', - 1) }} >-</button>
                                        <span className="counter">{guestsAmount.pets}</span>
                                        <button className={`${stayDetails.allowPets ? '' : 'not'}`} onClick={() => { handleGuestsAmount('pets', + 1) }}>+</button>
                                    </span>
                                </div>
                            </section>
                            <div id="reserve-btn" >

                                <GradientButton onClickBtn={() => { onCheckAvailabilty() }} label={'Check availabilty'} className={"reserve-btn"} />
                            </div>

                            {pickedDate.endDate ? (<div className="stay-price">


                                <div className="price-details flex justify-between">
                                    <div> $ {stay.price.toLocaleString('en-US')} x {getDaysCalculate()}</div>
                                    <div>$ {(stay.price * getDaysCalculate()).toLocaleString('en-US')}</div>
                                </div>
                                <div className="service-fee flex justify-between">
                                    <div>Service fee</div>
                                    <div>$ {serviceFee}</div>
                                </div>

                                <div className="total flex justify-between">
                                    <div>Total</div>
                                    <div> $ {(serviceFee + (stay.price * getDaysCalculate())).toLocaleString('en-US')}</div>
                                </div>
                            </div>) : ''}

                        </article>)}


                </section>
            </article>


            {isMobile ?
                (<div id="map" className="map">
                    <h4>Where you'll be</h4>
                    <p>{loc.city}, {loc.country}, {loc.address}</p>

                    <StayMap stayLoc={loc} />

                    {/* <div className="map-summary">{stay.summary}</div> */}
                </div>)
                : (<section id="reviews" >
                    {reviews.length > 0 ?
                        (<section className="reviews">
                            <h2 className="flex">
                                <AiFillStar />
                                <span style={{ 'marginLeft': '5px' }}>{reviews.length > 0 ? getStayReviewRateAvg(reviews) : '0'}</span>
                                <span style={{ 'marginLeft': '5px' }} className="dote">•</span>
                                <span style={{ 'marginLeft': '5px' }}>{reviews.length} reviews</span>
                            </h2>

                            {!isMobile && (<div className="reviews-bar">
                                <div className="cleanliness">
                                    <p>Cleanliness</p>
                                    <div className="progress">
                                        <progress id="file" value={getReviewsRateByType('cleanliness')} max="5"></progress>
                                        <span> {getReviewsRateByType('cleanliness')}</span>
                                    </div>
                                </div>
                                <div className="accuracy">
                                    <p>Accuracy</p>
                                    <div className="progress">
                                        <progress id="file" value={getReviewsRateByType('accuracy')} max="5"></progress>
                                        <span> {getReviewsRateByType('accuracy')}</span>
                                    </div>
                                </div>


                                <div className="communication">
                                    <p>Communication</p>
                                    <div className="progress">
                                        <progress id="file" value={getReviewsRateByType('communication')} max="5"></progress>
                                        <span> {getReviewsRateByType('communication')}</span>
                                    </div>
                                </div>
                                <div className="location">
                                    <p>Location</p>
                                    <div className="progress">
                                        <progress id="file" value={getReviewsRateByType('location')} max="5"></progress>
                                        <span> {getReviewsRateByType('location')}</span>
                                    </div>
                                </div>
                                <div className="check-in">
                                    <p>Check-in</p>
                                    <div className="progress">
                                        <progress id="file" value={getReviewsRateByType('checkIn')} max="5"></progress>
                                        <span> {getReviewsRateByType('checkIn')}</span>
                                    </div>
                                </div>

                                <div className="value">
                                    <p>Value</p>
                                    <div className="progress">
                                        <progress id="file" value={getReviewsRateByType('value')} max="5"></progress>
                                        <span> {getReviewsRateByType('value')}</span>
                                    </div>
                                </div>

                            </div>)}

                            <div className="reviews-list">
                                {reviews.map(review => {
                                    return <li key={review.id} className="review">
                                        <div className="review-user">
                                            <img src={review.by.imgUrl} />
                                            <div>
                                                <h4>{review.by.fullname}</h4>
                                                <p>{new Date(review.createdAt).getFullYear()}/{month[new Date(review.createdAt).getMonth()]}</p>
                                            </div>
                                        </div>
                                        <div className="txt">
                                            {review.txt}
                                        </div>
                                        {/* {review.txt.length > 50 && <div className="show"><a href="">show more </a> {<RiArrowRightSLine />}</div>} */}
                                    </li>
                                })}
                            </div>

                        </section>) :
                        (<div className="no-reviews">No reviews (yet)</div>)}


                </section>)
            }

            {isMobile ?
                (<section id="reviews" >
                    {reviews.length > 0 ?
                        (<section className="reviews">
                            <h2 className="flex">
                                <AiFillStar />
                                <span style={{ 'marginLeft': '5px' }}>{reviews.length > 0 ? getStayReviewRateAvg(reviews) : '0'}</span>
                                <span style={{ 'marginLeft': '5px' }} className="dote">•</span>
                                <span style={{ 'marginLeft': '5px' }}>{reviews.length} reviews</span>
                            </h2>

                            {!isMobile && (<div className="reviews-bar">
                                <div className="cleanliness">
                                    <p>Cleanliness</p>
                                    <div className="progress">
                                        <progress id="file" value={getReviewsRateByType('cleanliness')} max="5"></progress>
                                        <span> {getReviewsRateByType('cleanliness')}</span>
                                    </div>
                                </div>
                                <div className="accuracy">
                                    <p>Accuracy</p>
                                    <div className="progress">
                                        <progress id="file" value={getReviewsRateByType('accuracy')} max="5"></progress>
                                        <span> {getReviewsRateByType('accuracy')}</span>
                                    </div>
                                </div>


                                <div className="communication">
                                    <p>Communication</p>
                                    <div className="progress">
                                        <progress id="file" value={getReviewsRateByType('communication')} max="5"></progress>
                                        <span> {getReviewsRateByType('communication')}</span>
                                    </div>
                                </div>
                                <div className="location">
                                    <p>Location</p>
                                    <div className="progress">
                                        <progress id="file" value={getReviewsRateByType('location')} max="5"></progress>
                                        <span> {getReviewsRateByType('location')}</span>
                                    </div>
                                </div>
                                <div className="check-in">
                                    <p>Check-in</p>
                                    <div className="progress">
                                        <progress id="file" value={getReviewsRateByType('checkIn')} max="5"></progress>
                                        <span> {getReviewsRateByType('checkIn')}</span>
                                    </div>
                                </div>

                                <div className="value">
                                    <p>Value</p>
                                    <div className="progress">
                                        <progress id="file" value={getReviewsRateByType('value')} max="5"></progress>
                                        <span> {getReviewsRateByType('value')}</span>
                                    </div>
                                </div>

                            </div>)}

                            <div className="reviews-list">
                                {reviews.map(review => {
                                    return <li key={review.id} className="review">
                                        <div className="review-user">
                                            <img src={review.by.imgUrl} />
                                            <div>
                                                <h4>{review.by.fullname}</h4>
                                                <p>{new Date(review.createdAt).getFullYear() + 1}/{month[new Date(review.createdAt).getMonth()]}</p>
                                            </div>
                                        </div>
                                        <div className="txt">
                                            {review.txt}
                                        </div>
                                        {review.txt.length > 50 && <div className="show"><a href="">show more </a> {<RiArrowRightSLine />}</div>}
                                    </li>
                                })}
                            </div>

                        </section>) :
                        (<div>This Stay dont have any reviews yet</div>)}


                </section>)
                : (
                    <div id="map" className="map">
                        <h4>Where you'll be</h4>
                        <p>{loc.city}, {loc.country}, {loc.address}</p>

                        <StayMap stayLoc={loc} />

                        {/* <div className="map-summary">{stay.summary}</div> */}
                    </div>)
            }

        </section>
    </>)
}
