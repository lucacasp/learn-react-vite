import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Homepage from '../../src/pages/Homepage/Homepage'
import AboutPage from '../../src/pages/AboutPage/AboutPage'
import ContactPage from '../../src/pages/ContactPage/ContactPage'
import Layout from '../../src/components/Layout/Layout'
import MyWorks from '../../src/pages/MyWorks/MyWorks'

const PAGES = [
    {
        name: 'Home',
        path: '/',
        component: <Homepage />
    },
    {
        name: 'About',
        path: '/about',
        component: <AboutPage />
    },
    {
        name: 'Contact',
        path: '/contact',
        component: <ContactPage />
    },
    {
        name: 'Latest Works',
        path: '/latest-works',
        component: <MyWorks />
    }
]

const AppRoutes = () => {
    console.log('AppRoutes renderizzato')
    
    return (
        <Routes>
            <Route element={<Layout><Outlet /></Layout>}>
                {PAGES.map((page) => (
                    <Route key={page.name} path={page.path} element={page.component} />
                ))}
                <Route path="*" element={<div>404 - Pagina non trovata</div>} />
            </Route>
        </Routes>
    )
}

export default AppRoutes