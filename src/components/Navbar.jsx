import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { calendarLogout, clientLogout, onLogOut } from '../store';

export const Navbar = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const isAuth = useSelector( state => state.auth.isAuth );

    useEffect(() => {
        if(location.pathname === "/"){
            navigate('/calendar')
        }
        const auth = JSON.parse(localStorage.getItem('auth'));
        if( !auth ) navigate("/auth")
    },[isAuth, navigate, location.pathname]);

    const onLogout = () => {
        localStorage.setItem('auth', false);
        localStorage.removeItem('customers')
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
                                textDecoration: isActive ? 'underline' : 'none'
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
                        Clients
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
