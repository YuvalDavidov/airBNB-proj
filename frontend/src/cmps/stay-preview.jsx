import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { TiHeartFullOutline } from 'react-icons/ti'
import { IconContext } from 'react-icons'

import { removeStay, toggleInDetails } from '../store/stay.actions'
import { addToWishlist, removeFromWishlist, setIsModalOpen, setIsSignup } from '../store/user.actions'

import { ImageSlider } from './image-slider'

export function StayPreview({ stay, userLocation, onUpdateStay }) {
  const navigate = useNavigate()
  const user = useSelector((storeState) => storeState.userModule.user)

  // function calcMeanRate(stayReviews) {
  //   if (!stayReviews || !stayReviews.length) return null
  //   const sum = stayReviews.reduce((acc, review) => {
  //     acc += review.rate
  //     return acc
  //   }, 0)
  //   return sum / stayReviews.length
  // }

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

    const avg = rate / rateCount
    return avg
}

  function calcAirDistance(lat1, lng1, lat2, lng2) {
    var R = 6371 // km
    var dLat = converToRad(lat2 - lat1)
    var dLng = converToRad(lng2 - lng1)
    var lat1 = converToRad(lat1)
    var lat2 = converToRad(lat2)

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = R * c
    return d
  }

  // Converts numeric degrees to radians
  function converToRad(Value) {
    return (Value * Math.PI) / 180
  }

  function onRemoveStay(ev, stayId) {
    ev.stopPropagation()
    removeStay(stayId)
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

  function goTodetails(stayId) {

    navigate(`details/${stayId}`)

  }

  return (
    <article className='stay-preview'>
      <ImageSlider imgs={stay.imgUrls} stayId={stay._id} />
      <IconContext.Provider
        value={{ className: `heart-btn ${user?.wishlist.includes(stay._id) && 'is-active'}` }}
      >
        <div onClick={() => onToggleWishlist(stay._id)}>
          <TiHeartFullOutline />
        </div>
      </IconContext.Provider>
      <div
        onClick={() => goTodetails(stay._id)}
        className='stay-info'
      >
        <div className='loc-rate'>
          <span className='loc'>
            {stay.loc.city}, {stay.loc.country}
          </span>
          <span className='rate'>
            <svg
              viewBox='0 0 32 32'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              role='presentation'
              focusable='false'
              style={{
                display: 'block',
                height: '12px',
                width: '12px',
                fill: 'currentcolor',
              }}
            >
              <path
                d='M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z'
                fillRule='evenodd'
              ></path>
            </svg>
            <span className='rate-num'>
              {stay.reviews.length > 0 ? getStayReviewRateAvg(stay.reviews) % 1 !== 0
                ? getStayReviewRateAvg(stay.reviews).toFixed(2)
                : getStayReviewRateAvg(stay.reviews).toFixed(1)
                : ''}
            </span>
          </span>
        </div>
        <div className='distance'>
          {parseInt(
            calcAirDistance(
              userLocation.lat,
              userLocation.lng,
              stay.loc.lat,
              stay.loc.lng
            )
          ).toLocaleString('en-US')}{' '}
          kilometers away
        </div>
        <div className='dates'>Jan 17 – 22</div>
        <div className='price'>
          <span>${stay.price.toLocaleString('en-US')}</span> night
        </div>
        {/* <div className='actions'>
          <button onClick={(ev) => onUpdateStay(ev, stay)}>Edit</button>
          <button onClick={(ev) => onRemoveStay(ev, stay._id)}>X</button>
        </div> */}
      </div>
    </article>
  )
}
