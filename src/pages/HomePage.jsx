import { useEffect } from 'react'
import { Navbar } from '../components'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { onLoadC, onLoadT, onLoadedC, onLoadedT, setClients, setMembers } from '../store'
import { getDbClients } from '../clients/helpers/getDBClients'
// import { getOcasionalDates } from '../calendar/helper/getOcasionalDates'
import { useLayoutEffect } from 'react'
import { getDbTeam } from '../helpers/getDBTeam'

export const HomePage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth);


    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (!auth) navigate("/auth")
    }, [isAuth, navigate])

    useLayoutEffect(() => {
        dispatch(onLoadC())
        dispatch(onLoadT())
        getDbClients().then(customers => {
            dispatch(setClients(customers))
            dispatch(onLoadedC())
        });
        getDbTeam().then( teamMembers => {
            dispatch(setMembers(teamMembers))
            dispatch(onLoadedT())
        });
    }, [dispatch])

    // useLayoutEffect(() => {
    //     getOcasionalDates().then( dates => {
    //         dispatch(setOcasional(dates))
    //     })
    // },[dispatch])

    return (
        <div>
            <Navbar />
            <div id='detail'>
                <Outlet />
            </div>
        </div>
    )
}
