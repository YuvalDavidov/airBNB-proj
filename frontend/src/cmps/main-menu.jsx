import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { logout, setIsSignup, setIsModalOpen } from '../store/user.actions'

export function MainMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef()
  const user = useSelector((storeState) => storeState.userModule.user)

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', closeDropdown)

    return () => document.body.removeEventListener('click', closeDropdown)
  }, [])

  function onOpenModal(isSignup) {
    setIsSignup(isSignup)
    setIsModalOpen(true)
    setIsOpen(false)
  }

  return (
    <div ref={menuRef} className='main-menu'>
      <button
        className={`main-menu-btn ${isOpen && 'is-open'}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <svg
          viewBox='0 0 32 32'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
          className='hamburger-icon'
          role='presentation'
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
          <g fill='none' fillRule='nonzero'>
            <path d='m2 16h28'></path>
            <path d='m2 24h28'></path>
            <path d='m2 8h28'></path>
          </g>
        </svg>
        {!user && (
          <svg
            viewBox='0 0 32 32'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            className='user-icon'
            role='presentation'
            focusable='false'
            style={{
              display: 'block',
              height: '30px',
              width: '30px',
              fill: 'currentcolor',
            }}
          >
            <path d='m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z'></path>
          </svg>
        )}
        {user && <img src={user.imgUrl} alt='user img' />}
      </button>
      {isOpen && (
        <div className='dropdown'>
          {!user && <a href='#' onClick={() => onOpenModal(false)}>Log in</a>}
          {!user && <a href='#' onClick={() => onOpenModal(true)}>Sign up</a>}
          {user && <a href='/trips'>Trips</a>}
          {user && <a href='/wishlist'>Wishlist</a>}
          <hr />
          {user && <a href='/dashboard'>Manage listings</a>}
          {user && <hr/>}
          <a href='#'>Airbnb your home</a>
          <a href='#'>Help</a>
          {user && (
            <a href='#' onClick={logout}>
              Log out
            </a>
          )}
        </div>
      )}
    </div>
  )
}
