import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { calendarLogout, clientLogout, onLogOut } from '../store';

export const Navbar = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if(location.pathname === "/"){
            navigate('/calendar')
        }
    },[ navigate, location.pathname]);

    const onLogout = () => {
        localStorage.removeItem('token')
        dispatch(calendarLogout())
        dispatch(clientLogout())
        dispatch(onLogOut());
        navigate("/auth")
    }
    
    return (
        <div className='navbar navbar-dark bg-dark  mb-4 px-4'>
            <span>
                <i className="fa-solid fa-calendar"></i>
                &nbsp;
                Omar
            </span>
            <div className='mw-200 d-flex align-items-center'>
                <div className='linkspicker d-flex justify-content-around'>
                    <NavLink
                        to="/calendar"
                        style={({ isActive }) => {
                            return {
                                color: isActive ? '#7885BB' : "#fff",
                                textDecoration: isActive ? 'underline' : 'none',
                            }
                        }}

                    >
                        Calendar
                    </NavLink>
                    <NavLink
                        to="/clients"
                        style={({ isActive }) => {
                            return {
                                color: isActive ? '#7885BB' : "#fff",
                                textDecoration: isActive ? 'underline' : 'none'
                            }
                        }}

                    >
                        Customers
                    </NavLink>
                    <NavLink
                        to="/team"
                        style={({ isActive }) => {
                            return {
                                color: isActive ? '#7885BB' : "#fff",
                                textDecoration: isActive ? 'underline' : 'none'
                            }
                        }}

                    >
                        Team
                    </NavLink>
                </div>
                <button className='btn btn-outline-danger' onClick={onLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    &nbsp;
                    <span>Logout</span>
                </button>
            </div>
        </div>
    )
}
