import {Link} from "react-router-dom";

export default function Navbar(){
    return (
        <div id={'navbar'}>
            <section className={'nav-left'}>
                <h1>OLZ</h1>
            </section>
            <section className={'nav-right'}>
                <button id = 'sell-product'>Sell product</button>
                <Link to='/Profile'><button id = 'account'>Account</button></Link>
            </section>
        </div>
    )
}