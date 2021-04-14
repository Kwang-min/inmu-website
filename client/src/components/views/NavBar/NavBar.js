import React,{ useRef } from 'react'
import './NavBar.css'
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faBars, faDrum } from '@fortawesome/free-solid-svg-icons'


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
                    <FontAwesomeIcon icon={faDrum} />
                    <Link to="/">인생뮤직</Link>
                </div>
                <ul ref={navbarMenu} className="navbar__menu">
                    <li><Link to="/">학원소개</Link></li>
                    <li><Link to="/videoList">연주영상</Link></li>
                    <li><Link to="/">게시판</Link></li>
                    <li><Link to="/login">로그인</Link></li>
                    <li><Link to="/register">회원가입</Link></li>
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
