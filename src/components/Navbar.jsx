import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { calendarLogout, clientLogout, onLogOut } from '../store';

import './navbar.css'
import { NavbarLink } from './NavbarLink';
import { MenuOptions } from './MenuOptions';

export const Navbar = () => {

    const [showMenu, setShowMenu] = useState(false);
    const textFontSize = '25px';

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (location.pathname === "/") {
            navigate('/calendar')
        }
    }, [navigate, location.pathname]);

    const onLogout = () => {
        localStorage.removeItem('token')
        dispatch(calendarLogout())
        dispatch(clientLogout())
        dispatch(onLogOut());
        navigate("/auth")
    }

    const handleMenuClick = () => {
        setShowMenu(true)
    }

    return (
        <div className='navbar navbar-dark bg-dark  mb-4 px-4 navbarMenu'>
            <span style={{fontSize: textFontSize}}>
                <i className="fa-solid fa-calendar"></i>
                &nbsp;
                Omar
            </span>
            <div className='mw-200 d-flex align-items-center menu'>
                <div className='linkspicker d-flex justify-content-around'>
                    <NavbarLink toPath='calendar'>
                        Calendar
                    </NavbarLink>
                    <NavbarLink toPath='clients'>
                        Customers
                    </NavbarLink>
                    <NavbarLink toPath='team'>
                        Team
                    </NavbarLink>
                </div>
                <button className='btn btn-outline-danger' onClick={onLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    &nbsp;
                    <span>Logout</span>
                </button>
            </div>
            <div className='mobileMenu' onClick={handleMenuClick} style={{fontSize: textFontSize}}>
                <i className="fa-solid fa-bars"></i>
            </div>
            { showMenu && <MenuOptions handleShow={setShowMenu} logout={onLogout}/>}
        </div>
    )
}
