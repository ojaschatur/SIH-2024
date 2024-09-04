import "./Navbar.css"
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    return(
        <>
            <div className="navbar">
                <p>DIVYA<span>DRISHTI</span></p>

                <div className="links">
                    <Link className="link" to='/home'>Home</Link>
                    <Link className="link" to='/heatmap'>Heatmap</Link>
                    <Link className="link" to='/map'>Maps</Link>
                    <Link className="link" to='/logs'>Logs</Link>
                </div>

                <button className="loginBtn">Login</button>
            </div>
        
        </>
    )
}

export default Navbar