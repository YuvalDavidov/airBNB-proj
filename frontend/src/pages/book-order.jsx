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

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const serviceFee = 18

export function BookStay() {
  const { user } = useSelector((storeState) => storeState.userModule)
  const { isMobile } = useSelector((storeState) => storeState.systemModule)
  const isModalOpen = useSelector((storeState) => storeState.userModule.isModalOpen)
  const [order, setOrder] = useState(null)
  const [isOrderDone, setIsOrderDone] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()


  useEffect(() => {
    getOrderPickes()

    if (!order) return
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
    let rate = 0
    let rateCount = 0
    let sum = 0
    let count = 0

    if (stayReviews.length < 1) return '0'

    stayReviews.forEach((review) => {
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

  async function onOrder() {
    try {
      let orderToSave = orderService.getEmptyOrder()
      orderToSave.aboutOrder = order
      orderToSave.aboutOrder.totalPrice = stay.price * getDaysCalculate()
      orderToSave.aboutOrder.bookDate = Date.now()
      orderToSave.aboutOrder.status = 'Pending'
      orderToSave.aboutUser = {
        _id: user._id,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
      }
      const backOrder = await orderService.save(orderToSave)
      showSuccessMsg('Order has been made')
      setIsOrderDone(true)
      navigate('/trips')
    } catch (error) {
      throw new Error(error)
    }

  }

  if (!order) return <div>Loading..</div>

  const { stay, startDate, endDate, stayId } = order

  return (
    <>
      {isMobile ? (
        <section className='book-mobile'>
          <header className={isModalOpen ? 'modal-open' : ''}>
            <button onClick={() => navigate(`/details/${stayId}`)}>
              <svg
                viewBox='0 0 32 32'
                xmlns='http://www.w3.org/2000/svg'
                aria-label='Back'
                role='img'
                focusable='false'
                style={{
                  display: 'block',
                  fill: 'none',
                  height: '16px',
                  width: '16px',
                  stroke: 'currentcolor',
                  strokeWidth: '3',
                  overflow: 'visible',
                }}
              >
                <g fill='none'>
                  <path d='m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932'></path>
                </g>
              </svg>
            </button>
            <h3>Request to book</h3>
          </header>

          <div className='stay'>
            <img src={stay.imgUrls[0]} />

            <div className='stay-details'>
              <div className='flex column'>
                <small>{stay.type}</small>
                <span>{stay.name}</span>
              </div>
              <div className='reviews-details'>
                <span className='reviews-rate'>
                  <AiFillStar /> {getStayReviewRateAvg(stay.reviews)}
                </span>
                <span className='reviews-num'> ({stay.reviews.length}) </span>
              </div>
            </div>
          </div>
          <hr className='thin-hr' />
          <div className='air-cover'>
            <span>Your booking is protected by </span>
            <svg
              width='67'
              height='14'
              viewBox='0 0 67 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M25.9054 13.9996C25.2372 14.006 24.5746 13.8793 23.9571 13.6272C23.3735 13.3868 22.8463 13.0304 22.4083 12.5803C21.9653 12.1208 21.6178 11.5801 21.3856 10.9887C21.1355 10.3534 21.0104 9.67697 21.0168 8.99551C21.0103 8.30182 21.1383 7.61331 21.3942 6.96718C21.6351 6.35993 21.9919 5.80396 22.4452 5.32947C22.899 4.85541 23.4472 4.47894 24.0553 4.22365C24.6634 3.96835 25.3184 3.83973 25.9792 3.84583C26.6454 3.83901 27.3055 3.9726 27.9152 4.23767C28.4928 4.4893 29.006 4.86524 29.4173 5.33796C29.8325 5.8152 30.1273 6.38263 30.2778 6.99387L27.8193 7.46698C27.6545 7.08053 27.387 6.74522 27.0449 6.49649C26.7199 6.26139 26.3268 6.1359 25.9239 6.13862C25.5038 6.1316 25.0927 6.25931 24.7524 6.50255C24.402 6.76464 24.1277 7.11317 23.9571 7.51308C23.7552 7.96874 23.6546 8.46183 23.6621 8.95911C23.6525 9.44698 23.7498 9.93113 23.9473 10.3785C24.1205 10.7679 24.398 11.1035 24.75 11.349C25.0939 11.586 25.5044 11.7111 25.9239 11.7068C26.3487 11.7136 26.7659 11.5953 27.1224 11.3671C27.4845 11.1297 27.7618 10.786 27.9152 10.3845L30.3737 10.8576C30.2239 11.4815 29.916 12.0575 29.4788 12.5317C29.0414 13.0057 28.5033 13.3786 27.9029 13.6235C27.2695 13.8802 26.5901 14.0081 25.9054 13.9996Z'
                fill='#222222'
              />
              <path
                d='M35.8418 13.9996C35.1458 14.0066 34.4555 13.8766 33.8119 13.6175C33.2026 13.3727 32.6501 13.0101 32.1878 12.5515C31.7255 12.0929 31.3628 11.5477 31.1215 10.9487C30.8622 10.3037 30.7332 9.6157 30.7416 8.92277C30.7339 8.23399 30.8669 7.55063 31.1327 6.91264C31.3849 6.31181 31.7543 5.76464 32.2203 5.30162C32.6871 4.83977 33.2445 4.47462 33.8591 4.22802C34.512 3.96832 35.2114 3.83841 35.9163 3.84589C36.6111 3.83945 37.3001 3.96939 37.9425 4.22802C38.5509 4.47464 39.1025 4.83787 39.5648 5.29625C40.0271 5.75464 40.3907 6.29889 40.6341 6.89687C40.8936 7.5368 41.023 8.21995 41.0153 8.90821C41.0223 9.60008 40.8894 10.2865 40.6242 10.928C40.3734 11.5324 40.0035 12.0827 39.5354 12.5475C39.0685 13.0094 38.5111 13.3745 37.8966 13.6212C37.2441 13.8791 36.5456 14.0078 35.8418 13.9996V13.9996ZM35.8791 11.7069C36.3291 11.7129 36.7704 11.5861 37.1454 11.3429C37.5244 11.0936 37.8296 10.7514 38.0306 10.3506C38.2538 9.90674 38.3654 9.41722 38.3559 8.92277C38.3652 8.42832 38.2537 7.93884 38.0306 7.49493C37.8296 7.09409 37.5244 6.75189 37.1454 6.50261C36.7678 6.26501 36.3282 6.13867 35.8791 6.13867C35.4299 6.13867 34.9903 6.26501 34.6127 6.50261C34.2342 6.75205 33.9294 7.09424 33.7287 7.49493C33.5053 7.93875 33.3934 8.42823 33.4022 8.92277C33.3932 9.41732 33.5052 9.90682 33.7287 10.3506C33.9294 10.7513 34.2342 11.0935 34.6127 11.3429C34.9877 11.5861 35.4291 11.7129 35.8791 11.7069V11.7069Z'
                fill='#222222'
              />
              <path
                d='M44.3094 13.6995L40.6475 4.08582H43.4771L45.6595 11.0047L47.8789 4.08582H50.6161L46.9529 13.6995H44.3094Z'
                fill='#222222'
              />
              <path
                d='M55.2581 13.9997C54.5688 14.007 53.8848 13.8804 53.2456 13.6273C52.6476 13.388 52.1074 13.0285 51.6596 12.5719C51.207 12.1053 50.854 11.5547 50.6212 10.9524C50.3686 10.2985 50.2428 9.60395 50.2503 8.90466C50.2444 8.22049 50.3702 7.54138 50.6212 6.90304C50.8544 6.30578 51.2042 5.75895 51.6509 5.29325C52.0879 4.83896 52.6145 4.47659 53.1986 4.22814C53.8077 3.97015 54.465 3.83999 55.1283 3.84601C55.7988 3.83732 56.4643 3.96108 57.0852 4.20994C57.6593 4.44418 58.1748 4.79808 58.5958 5.24715C59.0255 5.7122 59.3567 6.25654 59.5699 6.84845C59.8059 7.51517 59.9217 8.21713 59.9123 8.92286V9.55974H52.8846C52.9959 10.2795 53.2617 10.8416 53.682 11.246C53.8923 11.4474 54.142 11.605 54.4161 11.7093C54.6901 11.8135 54.9829 11.8622 55.2766 11.8525C55.7025 11.8573 56.122 11.7505 56.4918 11.5432C56.8652 11.3276 57.1749 11.0203 57.3905 10.6515L59.7083 11.3794C59.4916 11.9173 59.1485 12.3973 58.707 12.7805C58.2509 13.1754 57.7223 13.4813 57.1494 13.6819C56.5428 13.8956 55.9026 14.0032 55.2581 13.9997V13.9997ZM55.1345 5.81124C54.8702 5.80468 54.6072 5.84954 54.3606 5.94324C54.1141 6.03693 53.8889 6.1776 53.698 6.35714C53.3082 6.72107 53.0515 7.21845 52.9279 7.84926H57.2483C57.1494 7.21845 56.9117 6.72107 56.5351 6.35714C56.3504 6.17745 56.1305 6.03642 55.8887 5.94258C55.6469 5.84875 55.3882 5.80406 55.1283 5.81124H55.1345Z'
                fill='#222222'
              />
              <path
                d='M66.5337 4.04794C66.4739 4.03518 66.4141 4.01988 66.3492 4.00967C66.1751 3.97905 66.0035 3.96375 65.8294 3.96375C65.2603 3.96375 64.7666 4.10152 64.3482 4.37197C63.9272 4.64497 63.5945 5.03533 63.3477 5.54561L63.2541 4.09131H60.8633V13.6973H63.4568V8.98488C63.4568 8.1965 63.6491 7.58672 64.0311 7.15553C64.4131 6.72435 64.9641 6.51003 65.6813 6.51003C65.8294 6.51003 65.975 6.52024 66.1153 6.5381C66.2556 6.55596 66.396 6.58912 66.5311 6.6376V4.04794H66.5337Z'
                fill='#222222'
              />
              <path
                d='M4.51015 13.9998C3.89447 14.0058 3.28539 13.8751 2.72849 13.6177C2.18308 13.3624 1.69675 13.0003 1.29944 12.5538C0.882929 12.0854 0.558641 11.5453 0.343036 10.9609C0.109209 10.3251 -0.00685578 9.65337 0.000312894 8.97748C-0.00662831 8.28891 0.112814 7.60473 0.352934 6.95763C0.577224 6.35955 0.912853 5.80752 1.34275 5.32961C1.7551 4.86869 2.26071 4.49688 2.82747 4.2378C3.40089 3.97633 4.02623 3.84252 4.65862 3.84596C5.2648 3.83733 5.86386 3.9748 6.40317 4.24629C6.92005 4.51072 7.36051 4.89877 7.68374 5.3745L7.75798 4.11892H10.1521V13.7269H7.75798L7.68374 12.3257C7.35467 12.8412 6.89408 13.2635 6.34749 13.551C5.78383 13.851 5.15153 14.0055 4.51015 13.9998V13.9998ZM5.1226 11.707C5.57105 11.7131 6.01091 11.5862 6.38461 11.3431C6.7618 11.0936 7.06558 10.7514 7.26555 10.3507C7.48835 9.90696 7.59991 9.41745 7.59095 8.92289C7.59976 8.42835 7.48821 7.93887 7.26555 7.49504C7.06558 7.09434 6.7618 6.75216 6.38461 6.50271C6.01091 6.25957 5.57105 6.13272 5.1226 6.13877C4.67415 6.13272 4.23429 6.25957 3.86059 6.50271C3.48294 6.75199 3.17873 7.0942 2.97842 7.49504C2.75613 7.93896 2.645 8.42844 2.65425 8.92289C2.64486 9.41735 2.756 9.90687 2.97842 10.3507C3.17873 10.7516 3.48294 11.0938 3.86059 11.3431C4.23429 11.5862 4.67415 11.7131 5.1226 11.707Z'
                fill='#FF385C'
              />
              <path
                d='M14.1448 1.45388C14.1503 1.71808 14.0822 1.97879 13.9476 2.2082C13.8178 2.42616 13.6302 2.60604 13.4045 2.72893C13.1724 2.8542 12.9114 2.91992 12.6461 2.91992C12.3808 2.91992 12.1198 2.8542 11.8877 2.72893C11.662 2.60604 11.4744 2.42616 11.3447 2.2082C11.2116 1.98045 11.1439 1.722 11.1487 1.45996C11.1439 1.19793 11.2116 0.939471 11.3447 0.711723C11.4741 0.493876 11.6618 0.314332 11.8877 0.192213C12.1196 0.0661672 12.3806 0 12.6461 0C12.9116 0 13.1727 0.0661672 13.4045 0.192213C13.6304 0.314332 13.8181 0.493876 13.9476 0.711723C14.08 0.937567 14.1481 1.19379 14.1448 1.45388ZM11.3359 13.6995V4.06359H13.9576V13.6995H11.3359Z'
                fill='#FF385C'
              />
              <path
                d='M20.8276 4.0477C20.7679 4.03494 20.7081 4.01963 20.6431 4.00943C20.469 3.97881 20.2975 3.9635 20.1234 3.9635C19.5543 3.9635 19.0605 4.10128 18.6421 4.37172C18.2211 4.64472 17.8885 5.03508 17.6416 5.54536L17.548 4.09107H15.1572V13.6971H17.7507V8.98464C17.7507 8.19626 17.9431 7.58647 18.3251 7.15529C18.7071 6.7241 19.258 6.50979 19.9753 6.50979C20.1234 6.50979 20.2689 6.51999 20.4092 6.53785C20.5496 6.55571 20.6899 6.58888 20.825 6.63736V4.0477H20.8276Z'
                fill='#FF385C'
              />
            </svg>
          </div>
          <hr />
          <div className='trip'>
            <h1>Your trip</h1>

            <div className='dates'>
              <span>Dates</span>
              <div>
                {new Date(startDate).getMonth() === new Date(endDate).getMonth() ? <div>
                  {month[new Date(startDate).getMonth()].substring(0, 3)} {new Date(startDate).getDate()} – {new Date(endDate).getDate()}
                </div> : <div>
                  {month[new Date(startDate).getMonth()].substring(0, 3)} {new Date(startDate).getDate()} – {month[new Date(endDate).getMonth()].substring(0, 3)} {new Date(endDate).getDate()}
                </div>}
              </div>
            </div>

            <div className='guests'>
              <span>Guests</span>
              <div>{getGuestsAmount()} {getGuestsAmount() > 1 ? 'guests' : 'guest'}</div>
            </div>
          </div>
          <hr />
          <div className='stay-price'>
            <h3>Price details</h3>
            <div className='price-details'>
              <div>
                {' '}
                ${stay.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} x {getDaysCalculate()} nights
              </div>
              <div>
                ${(stay.price * getDaysCalculate()).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className='service-fee'>
              <div>Service fee</div>
              <div>${serviceFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            </div>
            <div className='total'>
              <div>Total (USD)</div>
              <div>
                {' '}
                $
                {(serviceFee + stay.price * getDaysCalculate()).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
          <div className="reserve-btn-container">
            {user ? (
              !isOrderDone ? (
                <GradientButton
                  onClickBtn={() => {
                    onOrder()
                  }}
                  label={'Confirm'}
                  className={'reserve-btn'}
                />
              ) : (
                <GradientButton
                  label={'Tnx for ordering!'}
                  className={'reserve-btn'}
                />
              )
            ) : (
              <GradientButton
                onClickBtn={() => {
                  setIsModalOpen(true)
                }}
                label={'Login'}
                className={'reserve-btn'}
              />
            )}
          </div>
        </section>
      ) : (
        <section className='book'>
          <header>
            <button
              className='back-btn'
              onClick={() => navigate(`/details/${stayId}`)}
            >
              <svg
                viewBox='0 0 32 32'
                xmlns='http://www.w3.org/2000/svg'
                aria-label='Back'
                role='img'
                focusable='false'
                style={{
                  display: 'block',
                  fill: 'none',
                  height: '16px',
                  width: '16px',
                  stroke: 'currentcolor',
                  strokeWidth: '3',
                  overflow: 'visible',
                }}
              >
                <g fill='none'>
                  <path d='m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932'></path>
                </g>
              </svg>{' '}
            </button>
            <h1>Confirm and pay</h1>
          </header>

          <section className='main-area'>
            <section className='order-details'>
              <div className='rare-find'>
                <div>
                  <h4>this is a rare find</h4>
                  <div>{stay.host.fullname} place is usually booked.</div>
                </div>
                <div>
                  <SlDiamond />
                </div>
              </div>

              <div className='trip'>
                <h1>Your trip</h1>

                <div className='dates'>
                  <span>Dates</span>
                  <div>
                    {new Date(startDate).getMonth() === new Date(endDate).getMonth() ? <div>
                      {month[new Date(startDate).getMonth()].substring(0, 3)} {new Date(startDate).getDate()} – {new Date(endDate).getDate()}
                    </div> : <div>
                      {month[new Date(startDate).getMonth()].substring(0, 3)} {new Date(startDate).getDate()} – {month[new Date(endDate).getMonth()].substring(0, 3)} {new Date(endDate).getDate()}
                    </div>}
                  </div>
                </div>

                <div className='guests'>
                  <span>Guests</span>
                  <div>{getGuestsAmount()} {getGuestsAmount() > 1 ? 'guests' : 'guest'}</div>
                </div>
              </div>
              <hr />

              {user ? (
                !isOrderDone ? (
                  <GradientButton
                    onClickBtn={() => {
                      onOrder()
                    }}
                    label={'Confirm'}
                    className={'reserve-btn'}
                  />
                ) : (
                  <GradientButton
                    label={'Tnx for ordering!'}
                    className={'reserve-btn'}
                  />
                )
              ) : (
                <GradientButton
                  onClickBtn={() => {
                    setIsModalOpen(true)
                  }}
                  label={'Login'}
                  className={'reserve-btn'}
                />
              )}
            </section>

            <section className='stay-price-details'>
              <div className='stay'>
                <img src={stay.imgUrls[0]} />

                <div className='stay-book-details'>
                  <h6>{stay.type}</h6>
                  <span className='stay-name'>{stay.name}</span>
                  <div className='stay-review'>
                    <span className='total-rate'>
                      {' '}
                      <AiFillStar /> {getStayReviewRateAvg(stay.reviews)}
                    </span>
                    <span className='reviews-num'>
                      {' '}
                      ({stay.reviews.length} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <hr />
              <div className='air-cover'>
                <span>Your booking is protected by </span>
                <svg
                  width='67'
                  height='14'
                  viewBox='0 0 67 14'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M25.9054 13.9996C25.2372 14.006 24.5746 13.8793 23.9571 13.6272C23.3735 13.3868 22.8463 13.0304 22.4083 12.5803C21.9653 12.1208 21.6178 11.5801 21.3856 10.9887C21.1355 10.3534 21.0104 9.67697 21.0168 8.99551C21.0103 8.30182 21.1383 7.61331 21.3942 6.96718C21.6351 6.35993 21.9919 5.80396 22.4452 5.32947C22.899 4.85541 23.4472 4.47894 24.0553 4.22365C24.6634 3.96835 25.3184 3.83973 25.9792 3.84583C26.6454 3.83901 27.3055 3.9726 27.9152 4.23767C28.4928 4.4893 29.006 4.86524 29.4173 5.33796C29.8325 5.8152 30.1273 6.38263 30.2778 6.99387L27.8193 7.46698C27.6545 7.08053 27.387 6.74522 27.0449 6.49649C26.7199 6.26139 26.3268 6.1359 25.9239 6.13862C25.5038 6.1316 25.0927 6.25931 24.7524 6.50255C24.402 6.76464 24.1277 7.11317 23.9571 7.51308C23.7552 7.96874 23.6546 8.46183 23.6621 8.95911C23.6525 9.44698 23.7498 9.93113 23.9473 10.3785C24.1205 10.7679 24.398 11.1035 24.75 11.349C25.0939 11.586 25.5044 11.7111 25.9239 11.7068C26.3487 11.7136 26.7659 11.5953 27.1224 11.3671C27.4845 11.1297 27.7618 10.786 27.9152 10.3845L30.3737 10.8576C30.2239 11.4815 29.916 12.0575 29.4788 12.5317C29.0414 13.0057 28.5033 13.3786 27.9029 13.6235C27.2695 13.8802 26.5901 14.0081 25.9054 13.9996Z'
                    fill='#222222'
                  />
                  <path
                    d='M35.8418 13.9996C35.1458 14.0066 34.4555 13.8766 33.8119 13.6175C33.2026 13.3727 32.6501 13.0101 32.1878 12.5515C31.7255 12.0929 31.3628 11.5477 31.1215 10.9487C30.8622 10.3037 30.7332 9.6157 30.7416 8.92277C30.7339 8.23399 30.8669 7.55063 31.1327 6.91264C31.3849 6.31181 31.7543 5.76464 32.2203 5.30162C32.6871 4.83977 33.2445 4.47462 33.8591 4.22802C34.512 3.96832 35.2114 3.83841 35.9163 3.84589C36.6111 3.83945 37.3001 3.96939 37.9425 4.22802C38.5509 4.47464 39.1025 4.83787 39.5648 5.29625C40.0271 5.75464 40.3907 6.29889 40.6341 6.89687C40.8936 7.5368 41.023 8.21995 41.0153 8.90821C41.0223 9.60008 40.8894 10.2865 40.6242 10.928C40.3734 11.5324 40.0035 12.0827 39.5354 12.5475C39.0685 13.0094 38.5111 13.3745 37.8966 13.6212C37.2441 13.8791 36.5456 14.0078 35.8418 13.9996V13.9996ZM35.8791 11.7069C36.3291 11.7129 36.7704 11.5861 37.1454 11.3429C37.5244 11.0936 37.8296 10.7514 38.0306 10.3506C38.2538 9.90674 38.3654 9.41722 38.3559 8.92277C38.3652 8.42832 38.2537 7.93884 38.0306 7.49493C37.8296 7.09409 37.5244 6.75189 37.1454 6.50261C36.7678 6.26501 36.3282 6.13867 35.8791 6.13867C35.4299 6.13867 34.9903 6.26501 34.6127 6.50261C34.2342 6.75205 33.9294 7.09424 33.7287 7.49493C33.5053 7.93875 33.3934 8.42823 33.4022 8.92277C33.3932 9.41732 33.5052 9.90682 33.7287 10.3506C33.9294 10.7513 34.2342 11.0935 34.6127 11.3429C34.9877 11.5861 35.4291 11.7129 35.8791 11.7069V11.7069Z'
                    fill='#222222'
                  />
                  <path
                    d='M44.3094 13.6995L40.6475 4.08582H43.4771L45.6595 11.0047L47.8789 4.08582H50.6161L46.9529 13.6995H44.3094Z'
                    fill='#222222'
                  />
                  <path
                    d='M55.2581 13.9997C54.5688 14.007 53.8848 13.8804 53.2456 13.6273C52.6476 13.388 52.1074 13.0285 51.6596 12.5719C51.207 12.1053 50.854 11.5547 50.6212 10.9524C50.3686 10.2985 50.2428 9.60395 50.2503 8.90466C50.2444 8.22049 50.3702 7.54138 50.6212 6.90304C50.8544 6.30578 51.2042 5.75895 51.6509 5.29325C52.0879 4.83896 52.6145 4.47659 53.1986 4.22814C53.8077 3.97015 54.465 3.83999 55.1283 3.84601C55.7988 3.83732 56.4643 3.96108 57.0852 4.20994C57.6593 4.44418 58.1748 4.79808 58.5958 5.24715C59.0255 5.7122 59.3567 6.25654 59.5699 6.84845C59.8059 7.51517 59.9217 8.21713 59.9123 8.92286V9.55974H52.8846C52.9959 10.2795 53.2617 10.8416 53.682 11.246C53.8923 11.4474 54.142 11.605 54.4161 11.7093C54.6901 11.8135 54.9829 11.8622 55.2766 11.8525C55.7025 11.8573 56.122 11.7505 56.4918 11.5432C56.8652 11.3276 57.1749 11.0203 57.3905 10.6515L59.7083 11.3794C59.4916 11.9173 59.1485 12.3973 58.707 12.7805C58.2509 13.1754 57.7223 13.4813 57.1494 13.6819C56.5428 13.8956 55.9026 14.0032 55.2581 13.9997V13.9997ZM55.1345 5.81124C54.8702 5.80468 54.6072 5.84954 54.3606 5.94324C54.1141 6.03693 53.8889 6.1776 53.698 6.35714C53.3082 6.72107 53.0515 7.21845 52.9279 7.84926H57.2483C57.1494 7.21845 56.9117 6.72107 56.5351 6.35714C56.3504 6.17745 56.1305 6.03642 55.8887 5.94258C55.6469 5.84875 55.3882 5.80406 55.1283 5.81124H55.1345Z'
                    fill='#222222'
                  />
                  <path
                    d='M66.5337 4.04794C66.4739 4.03518 66.4141 4.01988 66.3492 4.00967C66.1751 3.97905 66.0035 3.96375 65.8294 3.96375C65.2603 3.96375 64.7666 4.10152 64.3482 4.37197C63.9272 4.64497 63.5945 5.03533 63.3477 5.54561L63.2541 4.09131H60.8633V13.6973H63.4568V8.98488C63.4568 8.1965 63.6491 7.58672 64.0311 7.15553C64.4131 6.72435 64.9641 6.51003 65.6813 6.51003C65.8294 6.51003 65.975 6.52024 66.1153 6.5381C66.2556 6.55596 66.396 6.58912 66.5311 6.6376V4.04794H66.5337Z'
                    fill='#222222'
                  />
                  <path
                    d='M4.51015 13.9998C3.89447 14.0058 3.28539 13.8751 2.72849 13.6177C2.18308 13.3624 1.69675 13.0003 1.29944 12.5538C0.882929 12.0854 0.558641 11.5453 0.343036 10.9609C0.109209 10.3251 -0.00685578 9.65337 0.000312894 8.97748C-0.00662831 8.28891 0.112814 7.60473 0.352934 6.95763C0.577224 6.35955 0.912853 5.80752 1.34275 5.32961C1.7551 4.86869 2.26071 4.49688 2.82747 4.2378C3.40089 3.97633 4.02623 3.84252 4.65862 3.84596C5.2648 3.83733 5.86386 3.9748 6.40317 4.24629C6.92005 4.51072 7.36051 4.89877 7.68374 5.3745L7.75798 4.11892H10.1521V13.7269H7.75798L7.68374 12.3257C7.35467 12.8412 6.89408 13.2635 6.34749 13.551C5.78383 13.851 5.15153 14.0055 4.51015 13.9998V13.9998ZM5.1226 11.707C5.57105 11.7131 6.01091 11.5862 6.38461 11.3431C6.7618 11.0936 7.06558 10.7514 7.26555 10.3507C7.48835 9.90696 7.59991 9.41745 7.59095 8.92289C7.59976 8.42835 7.48821 7.93887 7.26555 7.49504C7.06558 7.09434 6.7618 6.75216 6.38461 6.50271C6.01091 6.25957 5.57105 6.13272 5.1226 6.13877C4.67415 6.13272 4.23429 6.25957 3.86059 6.50271C3.48294 6.75199 3.17873 7.0942 2.97842 7.49504C2.75613 7.93896 2.645 8.42844 2.65425 8.92289C2.64486 9.41735 2.756 9.90687 2.97842 10.3507C3.17873 10.7516 3.48294 11.0938 3.86059 11.3431C4.23429 11.5862 4.67415 11.7131 5.1226 11.707Z'
                    fill='#FF385C'
                  />
                  <path
                    d='M14.1448 1.45388C14.1503 1.71808 14.0822 1.97879 13.9476 2.2082C13.8178 2.42616 13.6302 2.60604 13.4045 2.72893C13.1724 2.8542 12.9114 2.91992 12.6461 2.91992C12.3808 2.91992 12.1198 2.8542 11.8877 2.72893C11.662 2.60604 11.4744 2.42616 11.3447 2.2082C11.2116 1.98045 11.1439 1.722 11.1487 1.45996C11.1439 1.19793 11.2116 0.939471 11.3447 0.711723C11.4741 0.493876 11.6618 0.314332 11.8877 0.192213C12.1196 0.0661672 12.3806 0 12.6461 0C12.9116 0 13.1727 0.0661672 13.4045 0.192213C13.6304 0.314332 13.8181 0.493876 13.9476 0.711723C14.08 0.937567 14.1481 1.19379 14.1448 1.45388ZM11.3359 13.6995V4.06359H13.9576V13.6995H11.3359Z'
                    fill='#FF385C'
                  />
                  <path
                    d='M20.8276 4.0477C20.7679 4.03494 20.7081 4.01963 20.6431 4.00943C20.469 3.97881 20.2975 3.9635 20.1234 3.9635C19.5543 3.9635 19.0605 4.10128 18.6421 4.37172C18.2211 4.64472 17.8885 5.03508 17.6416 5.54536L17.548 4.09107H15.1572V13.6971H17.7507V8.98464C17.7507 8.19626 17.9431 7.58647 18.3251 7.15529C18.7071 6.7241 19.258 6.50979 19.9753 6.50979C20.1234 6.50979 20.2689 6.51999 20.4092 6.53785C20.5496 6.55571 20.6899 6.58888 20.825 6.63736V4.0477H20.8276Z'
                    fill='#FF385C'
                  />
                </svg>
              </div>
              <hr />
              <div className='stay-price'>
                <h3>Price details</h3>
                <div className='price-details'>
                  <div>
                    {' '}
                    ${stay.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} x{' '}
                    {getDaysCalculate()} nights
                  </div>
                  <div>
                    $
                    {(stay.price * getDaysCalculate()).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className='service-fee'>
                  <div>Service fee</div>
                  <div>${serviceFee.toFixed(2)}</div>
                </div>
                <hr />
                <div className='total'>
                  <div>Total (USD)</div>
                  <div>

                    $
                    {(
                      serviceFee +
                      stay.price * getDaysCalculate()
                    ).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <hr />
                <div className="deposit">
                  This property requires a ${(
                    (serviceFee +
                      stay.price * getDaysCalculate()) * 0.25
                  ).toLocaleString('en-US', { minimumFractionDigits: 2 })} security deposit. It will be collected separately by the property prior to your arrival or at check-in.
                </div>
              </div>
            </section>
          </section>
        </section>
      )}
    </>
  )
}
