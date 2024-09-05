import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        navigate('/');
    }

    const handleLogin = () => {
        navigate('/');
    }

    return (
        <>
            <div className="navbar">
                <p>DIVYA<span>DRISHTI</span></p>

                <div className="links">
                    <Link className="link" to='/home'>Home</Link>
                    <Link className="link" to='/heatmap'>Heatmap</Link>
                    <Link className="link" to='/map'>Maps</Link>
                    <Link className="link" to='/logs'>Logs</Link>
                </div>

                {/* Conditionally render buttons */}
                {location.pathname === '/home' && (
                    <button className="loginBtn" onClick={handleLogin}>Login</button>
                )}
                {location.pathname !== '/' && location.pathname !== '/home' && (
                    <button className="loginBtn" onClick={handleLogout}>Logout</button>
                )}
            </div>
        </>
    );
}

export default Navbar;
