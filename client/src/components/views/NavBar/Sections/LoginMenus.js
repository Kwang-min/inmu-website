import React from 'react'
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../../_actions/user_actions';

function LoginMenus(props) {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user)

    const logoutHandler = () => {

        dispatch(logoutUser())
            .then(response => {
                if (response.payload.success) {
                    props.history.push('/login')
                } else {
                    alert('Failed to log out')
                }
            })

    };

    if (user.userData && !user.userData.isAuth) {
        return (
            <>
                <ul ref={props.navbarloginMenus} className="navbar__loginMenus">
                        <li><Link to="/login">로그인</Link></li>
                        <li><Link to="/register">회원가입</Link></li>
                </ul>
            </>
        )
    } else {
        return (
            <>
                <ul ref={props.navbarloginMenus} className="navbar__loginMenus">
                        <li><a onClick={logoutHandler}>Logout</a></li>
                </ul>
            </>
        )
    }

    
}

export default withRouter(LoginMenus)
