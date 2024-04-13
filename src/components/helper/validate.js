import {toast} from "react-hot-toast";
import {authenticate,getUser} from "./helper";
import * as yup from "yup"

const passwordRules = /^(?=.&\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
export const basicSchema = yup.object().shape({
    username: yup.string().min(5).required("Required"),
    password: yup.string().min(5).matches(passwordRules,{ message: "Please create a stronger password"}).required("Required")
})
export async function loginValidate(values){
    const errors = loginVerify({},values);
    if(values.username){
        const {status} = await authenticate(values.username);
        console.log(status);
        if(status !== 200){
            errors.exist = toast.error('User does not exist');
        }
    }
    return errors
}

export async function registerValidate(values){
    return registerVerify({},values);
}

export async function profileValidate(values){
    return profileVerify({},values)
}
function loginVerify(errors = {}, values) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!values.username) {
        errors.username = toast.error("Username Required!");
    } else if (values.username.includes(" ")) {
        errors.username = toast.error('Space not allowed')
    } else if (!specialChars.test(values.password)) {
        errors.password = toast.error("Password must include special character")
    } else if (!values.password) {
        errors.password = toast.error("Password Requider")
    } else if (values.password.includes(" ")) {
        errors.password = toast.error("Space not allowed")
    } else if (values.password.length < 4) {
        errors.password = toast.error("Password must be more than 4 character long")
    }
    return errors
}

function registerVerify( errors = {}, values){
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(!values.email){
        errors.email = toast.error("Email Required!");
    }
    else if(values.email.includes(" ")){
        errors.email = toast.error('Space not allowed');
    } else if (!values.email.includes('@')){
        errors.email = toast.error('Not valid email!')
    } else if (!values.username) {
        errors.username = toast.error("Username Required!");
    } else if (values.username.includes(" ")) {
        errors.username = toast.error('Space not allowed')
    } else if (!specialChars.test(values.password)) {
        errors.password = toast.error("Password must include special character")
    } else if (!values.password) {
        errors.password = toast.error("Password Requider")
    } else if (values.password.includes(" ")) {
        errors.password = toast.error("Space not allowed")
    } else if (values.password.length < 4) {
        errors.password = toast.error("Password must be more than 4 character long")
    }
    return errors
}

function profileVerify( errors = {}, values){

}