import React, { useEffect } from 'react'
import { Navbar } from '../components'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClients } from '../store'

export const HomePage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth);


    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (!auth) navigate("/auth")
    }, [isAuth])

    useEffect(() => {
        dispatch(fetchClients());
    }, [])

    return (
        <div>
            <Navbar />
            <div id='detail'>
                <Outlet />
            </div>
        </div>
    )
}
