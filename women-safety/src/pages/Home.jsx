import Navbar from "../components/Navbar.jsx"
import home from "../assets/home.svg"
import "./Home.css"

function Home() {
    return(
        <>
            <Navbar/>
            <div className="info-container">
                <div className="home-info">
                    <div className="home-title">
                        OUR <span>MISSION</span>
                    </div>
                    <div className="home-description">
                        At <span>DivyaDrishti</span>, our mission is to create a safer world for women by leveraging the power of <span>real-time analytics</span> and <span>advanced surveillance technology</span>. We are dedicated to empowering communities and law enforcement with the tools they need to prevent crimes and ensure the safety and well-being of women in public spaces.
                    </div>
                </div>

                <img className="women-image" src={home}></img>

            </div>

            <div className="circle1"></div>
            <div className="circle2"></div>
        </>
        
    )

}

export default Home