import { useState } from 'react'
import { useSelector } from 'react-redux'

import { login , signup, setIsSignup, setIsModalOpen } from '../store/user.actions'
import { GradientButton } from './gradient-button'

export function LoginSignup() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    fullname: '',
  })

  const [isLoginError, setIsLoginError] = useState(false)

  const isSignup = useSelector((storeState) => storeState.userModule.isSignup)

  function handleChange({ target }) {
    const { value, name: field } = target
    setCredentials((prev) => ({ ...prev, [field]: value }))
  }

  async function onLogin(ev) {
    ev.preventDefault()
    if (!credentials.username || !credentials.password) return
    if (isSignup && !credentials.fullname) return
    try {
      if (isSignup) signup(credentials)
        else await login(credentials)
        setIsModalOpen(false)
    } catch (error) {
        setIsLoginError(true)
        setTimeout(()=> setIsLoginError(false), 2500)
  }
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
            {isLoginError && <span style={{color: 'red'}}>Password or username are not correct, please try again!</span>}
          < GradientButton className="signin-btn" label={isSignup ? 'Sign up' : 'Log in'} />
        </form>
        <div className='or-line'>
          <hr />
          <span>or</span>
          <hr />
        </div>
        {/* < GradientButton className="signin-btn" label="Continue as a guest" /> */}
        <button
          className='toggle-signup'
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? 'Already signed up?'
            : "Don't have an account yet? sign up"}
        </button>
      </div>
    </section>
  )
}
