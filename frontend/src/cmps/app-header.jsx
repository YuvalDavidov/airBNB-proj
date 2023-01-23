import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { HeaderFilter } from './header-filter'
import { MainMenu } from './main-menu'
import { LoginSignup } from './login-signup'
import { toggleInDetails } from '../store/stay.actions'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const { isHeadFilterExpanded, isStayDetails } = useSelector((storeState) => storeState.stayModule)
    const isModalOpen = useSelector((storeState) => storeState.userModule.isModalOpen)
    console.log(isStayDetails);
    const navigate = useNavigate()

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    function getBack() {
        toggleInDetails(false)
        navigate('/')
    }


    return (
        <div className="header-container full">

            <header className={`app-header ${(isHeadFilterExpanded) ? 'expanded' : ''} ${isStayDetails ? 'in-details' : ''}`}>

                <h1 className='logo' onClick={() => { getBack() }}>LOGO</h1>
                <HeaderFilter />
                {/* <nav>

                <NavLink>☢</NavLink>


            </nav> */}
                < MainMenu />
                {isModalOpen && < LoginSignup />}

            </header>
        </div>
    )
}

































// import routes from '../routes'

// {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}
// import { LoginSignup } from './login-signup.jsx'

// {user &&
//     <span className="user-info">
//         <Link to={`user/${user._id}`}>
//             {user.imgUrl && <img src={user.imgUrl} />}
//             {user.fullname}
//         </Link>
//         <span className="score">{user.score?.toLocaleString()}</span>
//         <button onClick={onLogout}>Logout</button>
//     </span>
// }
// {!user &&
//     <section className="user-info">
//         <LoginSignup onLogin={onLogin} onSignup={onSignup} />
//     </section>
// }