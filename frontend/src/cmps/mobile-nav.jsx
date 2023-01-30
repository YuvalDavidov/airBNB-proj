import { useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { logout } from '../store/user.actions'
import { socketService } from '../services/socket.service'
import { loadOrders } from '../store/order.actions'

export function MobileNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const mobileNavRef = useRef()
  const user = useSelector((storeState) => storeState.userModule.user)
  const { orders } = useSelector((storeState) => storeState.orderModule)

  useEffect(() => {
    if (!user) return
    loadOrders({ hostId: user._id })
    socketService.on('recieved-order', addedOrder => {
      loadOrders({ hostId: user._id })
    })
    return () => {
      window.onscroll = () => {
        return
      }
    }
  }, [])

  function onLogout() {
    logout()
    navigate('/')
  }

  var prevScrollpos = window.pageYOffset
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset
    if (prevScrollpos > currentScrollPos) {
      mobileNavRef.current.style.bottom = '0'
    } else {
      mobileNavRef.current.style.bottom = '-62px'
    }
    prevScrollpos = currentScrollPos
  }

  return (
    <nav ref={mobileNavRef} className='mobile-nav'>
      <div className='nav-container'>
        <div
          onClick={() => navigate('/')}
          className={`nav-item ${location.pathname === '/' && 'is-active'}`}
        >
          <svg
            viewBox='0 0 32 32'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            role='presentation'
            focusable='false'
            style={{
              display: 'block',
              fill: 'none',
              height: '24px',
              width: '24px',
              stroke: 'currentcolor',
              strokeWidth: '4',
              overflow: 'visible',
            }}
          >
            <g fill='none'>
              <path d='m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9'></path>
            </g>
          </svg>
          <span>Explore</span>
        </div>
        <div
          onClick={() => navigate('/wishlist')}
          className={`nav-item ${location.pathname === '/wishlist' && 'is-active'
            }`}
        >
          <svg
            viewBox='0 0 32 32'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            role='presentation'
            focusable='false'
            style={{
              display: 'block',
              fill: 'none',
              height: '24px',
              width: '24px',
              stroke: 'currentcolor',
              strokeWidth: '2.66667',
              overflow: 'visible',
            }}
          >
            <path d='m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z'></path>
          </svg>
          <span>Wishlist</span>
        </div>
        {user && (
          <>
            <div
              onClick={() => navigate('/trips')}
              className={`nav-item ${location.pathname === '/trips' && 'is-active'
                }`}
            >
              <svg
                viewBox='0 0 32 32'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
                role='presentation'
                focusable='false'
                style={{
                  display: 'block',
                  height: '24px',
                  width: '24px',
                  fill: 'currentcolor',
                }}
              >
                <path d='M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.877 6.478-6.357 6.478-2.224 0-4.556-1.258-6.709-3.386l-.257-.26-.172-.179h-.011l-.176.185c-2.044 2.1-4.267 3.42-6.414 3.615l-.28.019-.267.006C5.377 31 2.5 28.584 2.5 24.522l.005-.469c.026-.928.23-1.768.83-3.244l.216-.524c.966-2.298 6.083-12.989 7.707-16.034C12.537 1.963 13.992 1 16 1zm0 2c-1.239 0-2.053.539-2.987 2.21l-.523 1.008c-1.926 3.776-6.06 12.43-7.031 14.692l-.345.836c-.427 1.071-.573 1.655-.605 2.24l-.009.33v.206C4.5 27.395 6.411 29 8.857 29c1.773 0 3.87-1.236 5.831-3.354-2.295-2.938-3.855-6.45-3.855-8.91 0-2.913 1.933-5.386 5.178-5.42 3.223.034 5.156 2.507 5.156 5.42 0 2.456-1.555 5.96-3.855 8.907C19.277 27.766 21.37 29 23.142 29c2.447 0 4.358-1.605 4.358-4.478l-.004-.411c-.019-.672-.17-1.296-.714-2.62l-.248-.6c-1.065-2.478-5.993-12.768-7.538-15.664C18.053 3.539 17.24 3 16 3zm.01 10.316c-2.01.021-3.177 1.514-3.177 3.42 0 1.797 1.18 4.58 2.955 7.044l.21.287.174-.234c1.73-2.385 2.898-5.066 2.989-6.875l.006-.221c0-1.906-1.167-3.4-3.156-3.421h-.001z'></path>
              </svg>
              <span>Trips</span>
            </div>
            <div
              onClick={() => navigate('/dashboard/reservations')}
              className={`nav-item ${location.pathname === '/dashboard/reservations' && 'is-active'
                }`}
            >
              {orders.filter(order => order.aboutOrder.status === 'Pending').length > 0 && <div className='pending-count'>{orders.filter(order => order.aboutOrder.status === 'Pending').length}</div>}
              <svg
                width='24px'
                height='24px'
                viewBox='0 0 32 32'
                id='svg5'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
              >
                <defs id='defs2' />

                <g id='layer1' transform='translate(-156,-148)'>
                  <path
                    d='m 163,150.00586 a 1.0001,1.0001 0 0 0 -1,1 v 1 h -2 c -1.09273,0 -2,0.90727 -2,2 v 22 c 0,1.09273 0.90727,2 2,2 h 12 12 c 1.09273,0 2,-0.90727 2,-2 v -22 c 0,-1.09273 -0.90727,-2 -2,-2 h -2 v -1 a 1.0001,1.0001 0 0 0 -1,-1 h -5 c -1.63382,0 -3.08609,0.79779 -4,2.01953 -0.91391,-1.22174 -2.36618,-2.01953 -4,-2.01953 z m 1,2 h 4 c 1.6687,0 3,1.3313 3,3 v 18.10937 c -0.84542,-0.65402 -1.85499,-1.10937 -3,-1.10937 h -4 v -19 z m 12,0 h 4 v 1 19 h -4 c -1.14501,0 -2.15458,0.45535 -3,1.10937 v -18.10937 c 0,-1.6687 1.3313,-3 3,-3 z m -16,2 h 2 v 19 a 1.0001,1.0001 0 0 0 1,1 h 5 c 1.31666,0 2.41981,0.83058 2.82812,2 H 160 Z m 22,0 h 2 v 22 h -10.82812 c 0.40831,-1.16942 1.51146,-2 2.82812,-2 h 5 a 1.0001,1.0001 0 0 0 1,-1 z'
                    id='path21118'
                    style={{
                      color: 'currentColor',
                      fill: 'currentColor',
                      fillRule: 'evenodd',
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                      strokeMiterlimit: '4.1',
                      inkscapeStroke: 'none',
                    }}
                  />
                </g>
              </svg>
              <span>Reservations</span>
            </div>
            <div
              onClick={() => onLogout()}
              className='nav-item'
            >
              <svg
                width='24px'
                height='24px'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M15 12H3.62'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M5.85 8.6499L2.5 11.9999L5.85 15.3499'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <span>Log out</span>
            </div>
          </>
        )}
        {!user && (
          <div
            onClick={() => navigate('/login')}
            className={`nav-item ${location.pathname === '/login' && 'is-active'
              }`}
          >
            <svg
              viewBox='0 0 32 32'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              role='presentation'
              focusable='false'
              style={{
                display: 'block',
                height: '24px',
                width: '24px',
                fill: 'currentcolor',
              }}
            >
              <path d='m16 1c8.2842712 0 15 6.71572875 15 15 0 8.2842712-6.7157288 15-15 15-8.28427125 0-15-6.7157288-15-15 0-8.28427125 6.71572875-15 15-15zm0 8c-2.7614237 0-5 2.2385763-5 5 0 2.0143973 1.2022141 3.7998876 2.9996346 4.5835001l.0003231 2.0984999-.1499943.0278452c-2.8326474.5613112-5.31897338 2.2230336-6.93575953 4.5872979 2.34343054 2.291067 5.54974273 3.7028569 9.08579613 3.7028569 3.5355506 0 6.7414538-1.4113884 9.0850203-3.701476-1.6141801-2.3628535-4.0978119-4.0247647-6.929184-4.5867938l-.1558786-.0287302.001228-2.0991413c1.7288399-.7547474 2.9066959-2.4357565 2.9936498-4.355479l.0051645-.2283797c0-2.7614237-2.2385763-5-5-5zm0-6c-7.17970175 0-13 5.82029825-13 13 0 2.9045768.95257276 5.5866683 2.56235849 7.7509147 1.42074739-1.9134907 3.33951478-3.4002416 5.53860831-4.2955956l.3480332-.1363191-.0229565-.0189706c-1.43704227-1.2411241-2.34462949-3.045583-2.42083359-5.0285539l-.00520991-.2714755c0-3.8659932 3.1340068-7 7-7s7 3.1340068 7 7c0 1.9941317-.8415062 3.8279876-2.224566 5.1193683l-.225434.2006317.0447787.0163138c2.3268368.8792152 4.3570558 2.4138611 5.8430586 4.4127726 1.6098837-2.1632453 2.5621627-4.8449575 2.5621627-7.7490864 0-7.17970175-5.8202983-13-13-13z'></path>
            </svg>
            <span>Log in</span>
          </div>
        )}
      </div>
    </nav>
  )
}
