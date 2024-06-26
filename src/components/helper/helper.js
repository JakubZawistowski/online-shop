import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Zmieniony import na 'jwtDecode'

axios.defaults.baseURL = 'http://localhost:8080';

// Funkcja authenticate
export async function getUsername(){
    const token = localStorage.getItem('token');
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwtDecode(token); // Zmiana na jwtDecode
    return decode;
}
export const authenticate = async (username) => {
    try {
        return await axios.post('/api/authenticate', { username: username });
    } catch (error) {
        console.error("Błąd w funkcji authenticate:", error);
        return { error: "Wystąpił błąd podczas uwierzytelniania użytkownika." };
    }
};

export async function getUser({ username }){
    try{
        const {data} = await axios.get(`/api/user/${username}`)
        return {data}
    } catch (error) {
        return { error : "Password doesnt match!"}
    }
}

export async function registerUser(credentials){
    try{
        const {data :  {msg}, status} = await axios.post(`/api/register`, credentials)

        let { username, email } = credentials;

        if(status === 201){
            await axios.post('/api/registerMail', {username, userEmail: email, text : msg})
        }

        return Promise.resolve(msg)
    } catch(error) {
        return Promise.reject({error})
    }
}

export async function verifyPassword({ username, password }){
    try {
        if(username){
            const {data} = await axios.post('/api/login', { username, password });
            return Promise.resolve({ data });
        }
    } catch(error) {
        return Promise.reject({ error : "Password doesnt Match!"})
    }
}

export async function updateUser(response){
    try {

        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, { headers : {"Authorization" : `Bearer ${token}`} })
        console.log(data);
        return Promise.resolve({data})
    } catch(error){
        return Promise.reject({error : "Couldnt Update Profile!"})
    }
}

export async function generateOTP(username){
    try{
        const {data : {code}, status} = await axios.get('/api/generateOTP', {params : { username }})

        if(status === 201){
            let{data : {email}} = await getUser({ username })
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password`;
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject : "Password recovery OTP"})
        }
        return Promise.resolve(code);
    } catch(error){
        return Promise.reject({ error });
    }
}

export async function verifyOTP({username, code}){
    try{
        const {data,status} = await axios.get('/api/verifyOTP', {params : {username, code}})
        return {data, status}
    } catch(error){
        return Promise.reject(error);
    }
}

export async function resetPassword({ username, password }){
    try{
        const {data, status} = await axios.put('/api/resetPassword', {username, password});
        return Promise.resolve({data,status})
    } catch(error){
        return Promise.reject({error});
    }
}