import { useState } from 'react'
import { useSelector } from 'react-redux'

import { login , signup, setIsSignup, setIsModalOpen } from '../store/user.actions'

export function LoginSignup() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    fullname: '',
  })

  const isSignup = useSelector((storeState) => storeState.userModule.isSignup)

  function handleChange({ target }) {
    const { value, name: field } = target
    setCredentials((prev) => ({ ...prev, [field]: value }))
  }

  function onLogin(ev) {
    ev.preventDefault()
    if (!credentials.username || !credentials.password) return
    if (isSignup && !credentials.fullname) return
    if (isSignup) signup(credentials)
    else login(credentials)
    setIsModalOpen(false)
  }

  return (
    <section className='login-signup'>
      <div className='back-screen' onClick={() => setIsModalOpen(false)}></div>
      <div className='login-signup-modal'>
        <header>
          <span className='exit-modal-btn' onClick={() => setIsModalOpen(false)}>
            <svg
              viewBox='0 0 32 32'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
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
              <path d='m6 6 20 20'></path>
              <path d='m26 6-20 20'></path>
            </svg>
          </span>
          <h5>Log in or sign up</h5>
        </header>
        <hr />
        <h4>Welcome to AirTnt</h4>
        <form onSubmit={onLogin}>
          <div className='login-form'>
            {isSignup && (
              <>
                <input
                  type='text'
                  name='fullname'
                  placeholder='Full name'
                  value={credentials.fullname}
                  onChange={handleChange}
                />
                <hr />
              </>
            )}
            <input
              type='text'
              name='username'
              placeholder='User name'
              value={credentials.username}
              onChange={handleChange}
            />
            <hr />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={credentials.password}
              onChange={handleChange}
            />
          </div>

          <button className='signin-btn'>
            {isSignup ? 'Sign up' : 'Log in'}
          </button>
        </form>
        <div className='or-line'>
          <hr />
          <span>or</span>
          <hr />
        </div>
        <button className='signin-btn'>Continue as a guest</button>
        <button
          className='toggle-signup'
          onClick={() => setIsSignup((prev) => !prev)}
        >
          {isSignup
            ? 'Already signed up?'
            : "Don't have an account yet? sign up"}
        </button>
      </div>
    </section>
  )
}
