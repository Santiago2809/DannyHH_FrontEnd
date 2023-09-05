import { useEffect } from 'react'
import { Navbar } from '../components'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setClients } from '../store'
import { getDbClients } from '../clients/helpers/getDBClients'

export const HomePage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth);


    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (!auth) navigate("/auth")
    }, [isAuth, navigate])

    useEffect(() => {
        getDbClients().then(customers => {
            dispatch(setClients(customers))
            localStorage.setItem('customers', JSON.stringify(customers))
        });
        console.log("render")
    }, [dispatch])

    return (
        <div>
            <Navbar />
            <div id='detail'>
                <Outlet />
            </div>
        </div>
    )
}
