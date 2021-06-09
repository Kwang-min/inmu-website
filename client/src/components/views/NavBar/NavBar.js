import React, { useRef } from 'react'
import './NavBar.css'
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faBars, faDrum } from '@fortawesome/free-solid-svg-icons'
import LoginMenus from './Sections/LoginMenus';


function NavBar() {

	const navbarMenu = useRef();
	const navbarIcons = useRef();
	const navbarloginMenus = useRef();

	const toggleButton = () => {
		navbarMenu.current.classList.toggle('active')
		navbarIcons.current.classList.toggle('active')
		navbarloginMenus.current.classList.toggle('active')
	}

	const sendToInsta = () => {
		window.open('https://www.instagram.com/in_muu_dongtan/')
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
					<li><Link to="/videoList">수강생 연주</Link></li>
					<li><Link to="/boardList">인뮤 소식</Link></li>
				</ul>
				<LoginMenus navbarloginMenus={navbarloginMenus} />
				<ul ref={navbarIcons} className="navbar__icons">
					<li>
						<a onClick={sendToInsta}>
							<FontAwesomeIcon icon={faInstagram} style={{ fontSize: '1.5rem' }} />
						</a>
					</li>
				</ul>
				<a onClick={toggleButton} className="navbar__toggleBtn">
					<FontAwesomeIcon icon={faBars} />
				</a>
			</nav>
		</>
	)
}

export default NavBar
