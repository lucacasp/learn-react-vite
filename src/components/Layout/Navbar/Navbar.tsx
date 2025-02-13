import React, { useState } from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaInstagram } from "react-icons/fa";
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
                <h1 className='navbar-title'>
                    Renato Camera
                </h1>
                <Link to="/" onClick={closeMenu}>Home</Link>
                <Link to="/about" onClick={closeMenu}>About</Link>
                <Link to="/contact" onClick={closeMenu}>Contact</Link>
                <Link to="https://www.instagram.com/beeroom.agency/" onClick={closeMenu}>
                    <FaInstagram />
                </Link>
                
            </div>
        </div>
    )
}

export default Navbar