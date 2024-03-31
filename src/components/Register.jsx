import {Toaster} from "react-hot-toast";
import {useFormik} from "formik";
import {registerValidate} from "./helper/validate";
import {Link} from "react-router-dom";

export default function Register(){
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
            console.log(values)
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
                <button className={'login-btn'} type={'submit'}>Register</button>
            </form>
        </main>
    )
}