import avatar from '../assets/pfp.jpg'
import {useState} from "react";
import convertToBase64 from "./helper/convert";
import {useFormik} from "formik";
import {profileValidate} from "./helper/validate";
import {Toaster} from "react-hot-toast";

export default function Profile(){
    const [file ,setFile] = useState();
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
        },
        validate: profileValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values => {
            values = await Object.assign(values, {profile : file || ''})
            console.log(values)
        }
    })
    const onUpload = async e => {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    }
    return(
        <main id = 'profile'>
            <div className={'tile tile-shadow'}>
                <div className={'pfp-section'}>
                    <label htmlFor={"pfp"}>
                    <img src = {file || avatar} alt={'pfp'}/>
                    </label>
                    <input onChange={onUpload} type={'file'} id={'pfp'} accept="image/png, image/jpeg"/>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <Toaster position={'top-center'} reverseOrder= {false}></Toaster>
                    <input type='text' placeholder={'First name'} />
                    <input type='text' placeholder={'Last name'}/>
                    <input {...formik.getFieldProps('phone')} type='text' placeholder={'Phone number'}/>
                    <input {...formik.getFieldProps('email')} type='text' placeholder={'Email'} />
                    <input type='text' placeholder={'Address'}/>
                    <div><button type={'submit'} className={'login-btn'}>Update</button></div>
                </form>
            </div>
        </main>
    )
}