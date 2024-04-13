import {toast, Toaster} from "react-hot-toast";
import { useFormik } from "formik";
import { loginValidate } from "./helper/validate";
import {Link, Navigate, useNavigate} from "react-router-dom";
import { useAuthStore } from "../store/store";
import useFetch from "../hooks/fetch.hook";
import {verifyPassword} from "./helper/helper";
import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";

export default function Username() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const setUsername = useAuthStore(state => state.setUsername);
    const name = useSelector((state) => state.username);
    function setUser(username){
        dispatch({type:'SETNAME',payload: username})
    }
    const formik = useFormik({
        initialValues : {
            username : '',
            password: ''
        },
        validate : loginValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values => {
            setUser(values.username);
            setUsername(values.username);
            let loginPromise = verifyPassword({username: values.username,password : values.password});
            toast.promise(loginPromise,{
                loading: 'Checkin...',
                success : <b>Login Successfully...!</b>,
                error : <b>Password Not Match!</b>
            });

            loginPromise.then(res => {
                let { token } = res.data;
                localStorage.setItem('token', token)
                navigate('/')
            })
        }
    })

    return (
        <main id='username'>
            <Toaster position={'top-center'} reverseOrder={false}></Toaster>
            <form onSubmit={formik.handleSubmit} className={'tile-shadow'}>
                <div className={'top'}>
                    <h1>Login</h1>
                </div>
                <div className={'input-box'}>
                    <input {...formik.getFieldProps('username')} type={"text"} placeholder={'Username'} />
                </div>
                <div className={'input-box'}>
                    <input {...formik.getFieldProps('password')} type={"text"} placeholder={'Password'} />
                </div>
                <button className={'login-btn'} type={'submit'}>Login</button>
                <p>don't have an account? <Link to='/register'>Register</Link><br />
                    forgot password? <Link to='/recovery'>recovery</Link></p>
            </form>
        </main>
    );
}