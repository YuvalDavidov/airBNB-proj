import { AboutUs } from './pages/about-us.jsx'
import { AdminApp } from './pages/admin-app.jsx'
import { StayIndex } from './pages/stay-index.jsx'
import { StayDetails } from './pages/stay-details.jsx'
import { BookStay } from './pages/book-order.jsx'
import { Wishlist } from './pages/wishlist.jsx'
import { UserTrips } from './cmps/user-trips.jsx'
import { LoginPage } from './pages/login-page.jsx'
import { ChatApp } from './pages/chat-app.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [

    {
        path: '/',
        component: <StayIndex />,
        label: 'Stays'
    },
    {
        path: 'login',
        component: <LoginPage />,
        label: 'Login'
    },
    {
        path: 'details/:stayId',
        component: <StayDetails />,
        label: 'Details'
    },
    {
        path: 'wishlist',
        component: <Wishlist />,
        label: 'Wishlist'
    },
    {
        path: 'trips',
        component: <UserTrips />,
        label: 'UserTrips'
    },
    {
        path: 'book/?',
        component: <BookStay />,
        label: 'BookStay'
    },
    {
        path: 'about',
        component: <AboutUs />,
        label: 'About us'
    },
    {
        path: 'admin',
        component: <AdminApp />,
        label: 'Admin Only'
    },
    {
        path: 'chat/:guestId',
        component: <ChatApp />,
        label: 'Chat with Guest'
    }
]

export default routes