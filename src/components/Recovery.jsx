import {Toaster} from "react-hot-toast";
import {Link} from "react-router-dom";

export default function Recovery(){
    return(
        <main id = 'username'>
            <Toaster position={'top-center'} reverseOrder= {false}></Toaster>
            <form action={""} className={'tile-shadow'}>
                <div className={'top'}>
                    <h1>Password Recovery</h1>
                </div>
                <div className={'input-box'}>
                    <input  type={"text"} placeholder={'Email'}/>
                    <button className={'otp'}>send OTP</button>
                </div>
                <div className={'input-box'}>
                    <input  type={"text"} placeholder={'OTP code'}/>
                </div>
                <button className={'login-btn'} type={'submit'}>RECOVER</button>
                <p>back to <span><Link to ='/username'>Login</Link></span></p>
            </form>
        </main>
    )
}