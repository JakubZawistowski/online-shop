import avatar from '../assets/pfp.jpg'
import {useEffect, useState} from "react";
import convertToBase64 from "./helper/convert";
import {useFormik} from "formik";
import {profileValidate} from "./helper/validate";
import toast, {Toaster} from "react-hot-toast";
import useFetch from "../hooks/fetch.hook";
import {useSelector} from "react-redux";
import {updateUser} from "./helper/helper";
import {useNavigate} from "react-router-dom";

export default function Profile(){
    const [file, setFile] = useState();
    const [{ isLoading, apiData, serverError }] = useFetch();
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues : {
            firstName : apiData?.firstName || '',
            lastName: apiData?.lastName || '',
            email: apiData?.email || '',
            mobile: apiData?.mobile || '',
            address : apiData?.address || ''
        },
        enableReinitialize: true,
        validate : profileValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values => {
            values = await Object.assign(values, { profile : file || apiData?.profile || ''})
            console.log(values)
            let updatePromise = updateUser(values);
            toast.promise(updatePromise, {
                loading: 'Updating...',
                success : <b>Update Successfully...!</b>,
                error: <b>Could not Update!</b>
            });

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
                    <input {...formik.getFieldProps('firstName')}type='text' placeholder={'First name'} />
                    <input {...formik.getFieldProps('lastName')}type='text' placeholder={'Last name'}/>
                    <input {...formik.getFieldProps('phone')} type='text' placeholder={'Phone number'}/>
                    <input {...formik.getFieldProps('email')} type='text' placeholder={'Email'} />
                    <input {...formik.getFieldProps('address')}type='text' placeholder={'Address'}/>
                    <div><button type={'submit'} className={'login-btn'}>Update</button></div>
                </form>
            </div>
        </main>
    )
}