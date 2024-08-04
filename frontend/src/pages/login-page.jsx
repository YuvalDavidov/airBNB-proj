import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { login , signup, setIsSignup } from '../store/user.actions'
import { GradientButton } from '../cmps/gradient-button'

export function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    fullname: '',
  })
  const [isLoginError, setIsLoginError] = useState(false)

  const isSignup = useSelector((storeState) => storeState.userModule.isSignup)
  const navigate = useNavigate()

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
    } catch (error) {
        setIsLoginError(true)
        setTimeout(()=> setIsLoginError(false), 2500)
    }
  }

  return (
    <section className='login-page'>

        <header>
          
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
    </section>
  )
}
