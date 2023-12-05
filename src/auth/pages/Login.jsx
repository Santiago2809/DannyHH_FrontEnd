import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './login.css';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from '../../store';
import { notifyError } from '../../helpers/notifications';

export const Login = () => {

    // const status = false;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth);
    // if( status ) navigate("/calendar");

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (auth) navigate("/");
    }, [isAuth, navigate])

    const [values, handleInputChange] = useForm({
        username: '',
        pswd: ''
    });
    const { username, pswd } = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim().toLowerCase() == "omar" && pswd == "1234") {
            dispatch(onLogin());
            localStorage.setItem('auth', true);
        } else {
            notifyError('Incorrect username or password');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="container loginscreen">
                <div className='logincard card-body rounded p-4'>

                    <div className='logincard__username'>
                        <label className='mb-2 fs-5 fw-bold username'>Username:</label>
                        <div className="input-group mb-3">
                            <input onChange={handleInputChange} name='username' type="text" className="form-control" placeholder="user4" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                    </div>

                    <div className="logincard__password">
                        <label className='mb-2 fs-5 fw-bold pswd'>Password:</label>
                        <div className="input-group mb-3">
                            <input onChange={handleInputChange} name='pswd' type="password" className="form-control" placeholder="password123" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                    </div>

                    <div className="button d-flex justify-content-center">
                        <button className="btn btn-primary w-75">Login</button>
                    </div>

                </div>
            </div>
        </form>
    )

}
