import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { HeaderFilter } from './header-filter'
import { MainMenu } from './main-menu'
import { LoginSignup } from './login-signup'
import { setFilterBy, toggleExpand, toggleInDetails } from '../store/stay.actions'
import { SiAirbnb } from "react-icons/si";
import { setIsDesktop, setIsMobile } from '../store/system.actions'
import { useWindowSize } from '../customHooks/useWindowSize'
import { stayService } from '../services/stay.service.local'

export function AppHeader() {
    const location = useLocation()
    const user = useSelector(storeState => storeState.userModule.user)
    const { isHeadFilterExpanded, isStayDetails } = useSelector((storeState) => storeState.stayModule)
    const { isMobile } = useSelector((storeState) => storeState.systemModule)
    const isModalOpen = useSelector((storeState) => storeState.userModule.isModalOpen)
    const navigate = useNavigate()
    const windowSize = useWindowSize()
    useEffect(() => {
        if (windowSize.innerWidth < 780) setIsMobile()
        else setIsDesktop()
    }, [windowSize])

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
        setFilterBy(stayService.getDefaultFilter())
        toggleExpand(false)
        toggleInDetails(false)
        navigate('/')
    }

    return (
        <div className={`header-container full ${(isHeadFilterExpanded) ? 'expanded' : ''} ${isMobile ? 'in-mobile' : ''}  ${isStayDetails ? 'in-details' : ''} ${(location.pathname === '/') ? 'in-main' : ''}`}>

            <header className={`app-header ${(isHeadFilterExpanded) ? 'expanded' : ''} ${isStayDetails ? 'in-details' : ''}`}>

                <h1 className='logo' onClick={() => { getBack() }}> <span><SiAirbnb /></span>irTNT</h1>
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