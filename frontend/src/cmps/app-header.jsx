import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { HeaderFilter } from './header-filter'
import { MainMenu } from './main-menu'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const isHeadFilterExpanded = useSelector((storeState) => storeState.stayModule.isHeadFilterExpanded)

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



    return (


        <header className={`app-header full grid ${(isHeadFilterExpanded) ? 'expanded' : ''}`}>
            <h1 className='mail-layout' onClick={() => { navigate('/') }}>LOGO</h1>
            <HeaderFilter />
            {/* <nav>

                <NavLink>☢</NavLink>


            </nav> */}
            < MainMenu />
        </header>
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