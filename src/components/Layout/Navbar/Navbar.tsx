import React, { useState } from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const closeMenu = () => {
        setIsOpen(false);
    }

    return (
        <div className="navbar">
            <div className="hamburger-menu" onClick={toggleMenu}>
                <RxHamburgerMenu />
            </div>
            <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                <Link to="/" onClick={closeMenu}>Home</Link>
                <Link to="/about" onClick={closeMenu}>About</Link>
                <Link to="/contact" onClick={closeMenu}>Contact</Link>
            </div>
        </div>
    )
}

export default Navbar