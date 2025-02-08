import React, { ReactNode } from 'react'

import { Outlet, Link } from 'react-router-dom'

import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
interface LayoutProps {
    children: ReactNode
}

function Layout({ children }: LayoutProps) {
    return (
        <div>
            <Navbar />

            <div style={{ padding: '20px' }}>
                {/* Qui viene renderizzato il contenuto delle rotte figlie */}
                <Outlet />
            </div>

            <Footer />
        </div>
    )
}

export default Layout