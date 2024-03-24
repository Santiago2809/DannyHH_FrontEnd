import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './login.css';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { onLogin } from '../../store';
import { notifyError } from '../../helpers/notifications';
import { login } from '../helpers/login';
import { getToken, isAuth, setToken } from '../../helpers/authToken';

export const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = isAuth(getToken());
        token.then( res => {
            if (res) navigate("/")
        });
    }, [navigate])

    const [values, handleInputChange] = useForm({
        username: '',
        pswd: ''
    });
    const { username, pswd } = values;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {data} = await login(username, pswd);
        if(data){
            setToken(data.token)
            dispatch(onLogin());
            navigate("/");
        } else {
            notifyError('Incorrect username or password')
        }
    }

    return (
        <form onSubmit={handleSubmit} className='loginForm'>
            <div className="container loginscreen">
                <div className='logincard card-body rounded p-4 shadow p-3 mb-5 bg-white rounded'>
                    <h1 className='loginTitle'>Login</h1>
                    <div className='logincard__username'>
                        {/* <label className='mb-2 fs-5 fw-bold username'>Username:</label> */}
                        <div className="input-group mb-3">
                            <input onChange={handleInputChange} name='username' type="text" className="form-control loginInput" placeholder="Enter your username" aria-label="Username" aria-describedby="basic-addon1" autoComplete='off'/>
                        </div>
                    </div>

                    <div className="logincard__password">
                        {/* <label className='mb-2 fs-5 fw-bold pswd'>Password:</label> */}
                        <div className="input-group mb-3">
                            <input onChange={handleInputChange} name='pswd' type="password" className="form-control loginInput" placeholder="Enter you password" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                    </div>

                    <div className="button d-flex justify-content-center">
                        <button className="btn w-75 loginBtn" type='submit'>Login</button>
                    </div>

                </div>
            </div>
        </form>
    )

}
