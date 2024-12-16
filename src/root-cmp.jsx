import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

// import './assets/style/main.css'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { store } from './store/store.js'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyDashboard } from './pages/ToyDashboard.jsx'
import { LoginSignup } from './cmps/LoginSignup.jsx'
import { LoginPage } from './pages/LoginPage.jsx'


export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="app">
                    <AppHeader />
                    <main className='main-layout'>
                    <Routes>
                        <Route element={<HomePage />} path="/" />
                        <Route element={<AboutUs />} path="/about" />
                        <Route element={<ToyIndex />} path="/toy" />
                        <Route element={<ToyEdit />} path="/toy/edit" />
                        <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                        <Route element={<ToyDetails />} path="/toy/:toyId" />
                        <Route element={<ToyDashboard />} path={'/dashboard'} />
                        
                        <Route path="/" element={<LoginSignup />} />
                        <Route path="/login" element={<LoginPage isSignup={false} />} />
                        <Route path="/signup" element={<LoginPage isSignup={true} />} />
                    </Routes>
                </main>
                    <AppFooter />
                </section>
            </Router>
        </Provider>
    )
}


