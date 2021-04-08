import React,{ useRef } from 'react'
import './NavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAccusoft, faInstagram, faTwitter,faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'


function NavBar() {

    const navbarMenu = useRef();
    const navbarIcons = useRef();

    const toggleButton = () => {
        navbarMenu.current.classList.toggle('active')
        navbarIcons.current.classList.toggle('active')
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar__logo">
                    <FontAwesomeIcon icon={faAccusoft} />
                    <a href="">DreamCoding</a>
                </div>
                <ul ref={navbarMenu} className="navbar__menu">
                    <li><a href="">Home</a></li>
                    <li><a href="">Gallery</a></li>
                    <li><a href="">Wedding</a></li>
                    <li><a href="">FAQ</a></li>
                    <li><a href="">Bookings</a></li>
                </ul>
                <ul ref={navbarIcons} className="navbar__icons">
                    <li><FontAwesomeIcon icon={faInstagram} /></li>
                    <li><FontAwesomeIcon icon={faFacebookF} /></li>
                </ul>
                <a href="#" onClick={toggleButton} className="navbar__toggleBtn">
                    <FontAwesomeIcon icon={faBars} />
                </a>
            </nav>
        </>
    )
}

export default NavBar
