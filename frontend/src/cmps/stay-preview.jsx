import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { TiHeartFullOutline } from 'react-icons/ti'
import { IconContext } from 'react-icons'

import { addToWishlist, removeFromWishlist, setIsModalOpen, setIsSignup } from '../store/user.actions'

import { ImageSlider } from './image-slider'
import { utilService } from '../services/util.service'
import { stayService } from '../services/stay.service'

export function StayPreview({ stay, userLocation }) {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const user = useSelector((storeState) => storeState.userModule.user)

  function calcAirDistance(lat1, lng1, lat2, lng2) {
    var R = 6371 // km
    var dLat = converToRad(lat2 - lat1)
    var dLng = converToRad(lng2 - lng1)
    lat1 = converToRad(lat1)
    lat2 = converToRad(lat2)

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

  function onToggleWishlist(stayId) {
    if (!user) {
      setIsSignup(false)
      setIsModalOpen(true)
      return
    }
    if (user?.wishlist.includes(stayId)) {
      removeFromWishlist(stayId)
    } else {
      addToWishlist(stayId)
    }
  }

  function goTodetails(stayId) {

    let filterToDetails = {
      adults: '',
      infants: '',
      children: '',
      pets: '',
      startDate: '',
      endDate: ''
    }

    if (searchParams.get('adults') || searchParams.get('startDate')) {
      for (const field in filterToDetails) {

        filterToDetails[field] = searchParams.get(field)
        if (filterToDetails[field].valueOf() === 'undefined' || filterToDetails[field].valueOf() === 'NaN' || filterToDetails[field].valueOf() === 'false') filterToDetails[field] = false
      }
      navigate(`details/${stayId}/?adults=${filterToDetails.adults}&children=${filterToDetails.children}&infants=${filterToDetails.infants}&pets=${filterToDetails.pets}&startDate=${filterToDetails.startDate}&endDate=${filterToDetails.endDate}`)
    } else navigate(`details/${stayId}`)

  }

  return (
    <article className='stay-preview'>
      <ImageSlider imgs={stay.imgUrls} stayId={stay._id} goTodetails={goTodetails} />
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
            {stay.reviews.length > 0 && <svg
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
            </svg>}
            <span className='rate-num'>
              {stay.reviews.length > 0 ? stayService.getStayReviewRateAvg(stay.reviews) % 1 !== 0
                ? stayService.getStayReviewRateAvg(stay.reviews)
                : stayService.getStayReviewRateAvg(stay.reviews)
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
        <div className='dates'>{months[utilService.getRandomDate().getMonth()] + ' ' + utilService.getRandomIntInclusive(1, 15) + '–' + utilService.getRandomIntInclusive(16, 30)}</div>
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
