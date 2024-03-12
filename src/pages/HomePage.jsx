import { useEffect } from 'react'
import { Navbar } from '../components'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { onLoadC, onLoadT, onLoadedC, onLoadedT, setClients, setMembers } from '../store'
import { getDbClients } from '../clients/helpers/getDBClients'
import { useLayoutEffect } from 'react'
import { getDbTeam } from '../helpers/getDBTeam'
import { getToken, isAuth } from '../helpers/authToken'

export const HomePage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = isAuth(getToken());
        token.then( res => {
            if (!res) navigate("/auth")
        });
    },[navigate]);

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

    return (
        <div>
            <Navbar />
            <div id='detail'>
                <Outlet />
            </div>
        </div>
    )
}
