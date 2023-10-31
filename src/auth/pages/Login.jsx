import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './login.css';
import { useForm } from '../../hooks/useForm';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from '../../store';

export const Login = () => {

    // const status = false;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuth = useSelector( state => state.auth.isAuth );
    // if( status ) navigate("/calendar");

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem('auth'));
        // console.log(auth)
        if( auth ) navigate("/");
    }, [isAuth])

    const [ values, handleInputChange ] = useForm({
        username: '',
        pswd: ''
    });
    const { username, pswd } = values;

    const onSubmit = () => {
        if( username.trim() == "Omar" && pswd == "1234") {
            localStorage.setItem('auth',true);
            dispatch(onLogin());
            // navigate("/calendar");
        } else {
            toast.error('Incorrect username or password', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    const onSubmitKey = ({code}) => {
        
        if(code != "Enter") return;
        // console.log(code)
        if( username.trim() == "Omar" && pswd == "1234") {
            localStorage.setItem('auth',true);
            dispatch(onLogin());
            // navigate("/calendar");
        } else {
            toast.error('Incorrect username or password', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    return (
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
                        <input onChange={handleInputChange} onKeyUp={onSubmitKey} name='pswd' type="password" className="form-control" placeholder="password123" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                </div>

                <div className="button d-flex justify-content-center">
                    <button onClick={onSubmit} className="btn btn-primary w-75">Login</button>
                </div>

            </div>
        </div>
    )
  
}
