import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'

import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export function AppHeader() {

    // const navigate = useNavigate()
    // const dispatch = useDispatch()

    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('Logout successfully')
        } catch (err) {
            showErrorMsg('OOPs try again')
        }
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>Mister-Toy</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    {user && <NavLink to="/user" >Profile</NavLink>}
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                    <NavLink to="/review" >Reviews</NavLink>
                </nav>
            </section>
            {
                user ? (
                    < section >
                        <span to={`/user/${user._id}`}>Hello {user.fullname} <span>${user.score.toLocaleString()}</span></span>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup />
                    </section>
                )
            }
        </header >
    )
}
