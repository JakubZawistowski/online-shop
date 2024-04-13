import {toast, Toaster} from "react-hot-toast";
import {useFormik} from "formik";
import {registerValidate} from "./helper/validate";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {registerUser} from "./helper/helper";
export default function Register(){
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: ''
        },
        validate: registerValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values => {
            let registerPromise = registerUser(values);
            await toast.promise(registerPromise,{
                loading: 'Creating...',
                success : <b>Register Successfully</b>,
                error : <b>Could not Register</b>
            })
            registerPromise.then(function(){navigate('/')});
        }
    })

    return(
        <main id = 'username'>
            <Toaster position={'top-center'} reverseOrder= {false}></Toaster>
            <form action={""} onSubmit={formik.handleSubmit} className={'tile-shadow'}>
                <div className={'top'}>
                    <h1>Registration</h1>
                </div>
                <div className={'input-box'}>
                    <input {...formik.getFieldProps('email')} type={"text"} placeholder={'Email'} />
                </div>
                <div className={'input-box'}>
                    <input {...formik.getFieldProps('username')} type={"text"} placeholder={'Username'} />
                </div>
                <div className={'input-box'}>
                    <input {...formik.getFieldProps('password')} type={"text"} placeholder={'Password'} />
                </div>
                <div className={"register-section"}>
                    <p><Link to='/username'>Back to login!</Link></p>
                    <button className={'login-btn'} type={'submit'}>Register</button>
                </div>
            </form>
        </main>
    )
}