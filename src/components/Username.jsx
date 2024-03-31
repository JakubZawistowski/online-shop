import {Toaster} from "react-hot-toast";
import {useFormik} from "formik";
import {loginValidate} from "./helper/validate";
import {Link} from "react-router-dom";

export default function Username(){
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validate: loginValidate,
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
                <h1>Login</h1>
                </div>
                <div className={'input-box'}>
                    <input {...formik.getFieldProps('username')} type={"text"} placeholder={'Username'}/>
                </div>
                <div className={'input-box'}>
                    <input {...formik.getFieldProps('password')} type={"text"} placeholder={'Password'}/>
                </div>
                <button className={'login-btn'} type={'submit'}>Login</button>
                <p>don't have an account? <span><Link to ='/register'>Register</Link></span></p>
            </form>
        </main>
    )
}