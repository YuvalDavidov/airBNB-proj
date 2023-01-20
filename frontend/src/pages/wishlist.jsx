import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getStaysForWishlist } from '../store/stay.actions'

export function Wishlist() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const stays = useSelector((storeState) => storeState.stayModule.staysForWishlist)
  const navigate = useNavigate()

  useEffect(() => {
    getStaysForWishlist(user.wishlist)
  }, [])

  return <section className="wishlist">
    <h1>Wishlist</h1>
    <div className="wishlist-container">
        {stays.map(stay => {
            return <article className="wishlist-preview" onClick={() => navigate(`/details/${stay._id}`)} >
                <div className="img-grid">
                    <img className="img1" src={stay.imgUrls[0]} alt="" />
                    <img className="img2" src={stay.imgUrls[1]} alt="" />
                    <img className="img3" src={stay.imgUrls[2]} alt="" />
                </div>
                <h2>{stay.name}</h2>
            </article>
        })}
    </div>
  </section>
}
