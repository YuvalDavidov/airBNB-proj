import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getStaysForWishlist } from '../store/stay.actions'
import { setIsSignup, setIsModalOpen } from '../store/user.actions'

import { GradientButton } from '../cmps/gradient-button'

export function Wishlist() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const stays = useSelector((storeState) => storeState.stayModule.staysForWishlist)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      getStaysForWishlist(user.wishlist)
    }
  }, [])

  function onOpenLoginModal() {
    setIsSignup(false)
    setIsModalOpen(true)
  }

  return <section className="wishlist">
    <h1>Wishlist</h1>
    {user && <div className="wishlist-container">
        {stays.map(stay => {
            return <article key={stay._id} className="wishlist-preview" onClick={() => navigate(`/details/${stay._id}`)} >
                <div className="img-grid">
                    <img className="img1" src={stay.imgUrls[0]} alt="" />
                    <img className="img2" src={stay.imgUrls[1]} alt="" />
                    <img className="img3" src={stay.imgUrls[2]} alt="" />
                </div>
                <h2>{stay.name}</h2>
            </article>
        })}
    </div>}
    {!user && <div className='logged-out-wishlist'>
      <h2>Log in to view your wishlist</h2>
      <p>You can create, view, or edit wishlist once youv'e logged in.</p>
      <GradientButton onClickBtn={onOpenLoginModal} className='open-login-modal-btn' label='Log in' />
      </div>}
  </section>
}
