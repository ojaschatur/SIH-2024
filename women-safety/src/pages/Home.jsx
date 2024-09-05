import { useEffect } from "react";
import { gsap } from "gsap";
import Navbar from "../components/Navbar.jsx";
import home from "../assets/home.svg";
import "./Home.css";

function Home() {
  useEffect(() => {
    // GSAP animations
    gsap.fromTo(
      ".home-title",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
    );

    gsap.fromTo(
      ".home-description",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, delay: 0.4, ease: "power3.out" }
    );

    gsap.fromTo(
      ".women-image",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.6, ease: "power3.out" }
    );

    gsap.fromTo(
      ".circle1, .circle2",
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 1.5, delay: 0.8, ease: "elastic.out(1, 0.5)" }
    );
  }, []);

  return (
    <>
      <Navbar />
      <div className="info-container">
        <div className="home-info">
          <div className="home-title">
            OUR <span>MISSION</span>
          </div>
          <div className="home-description">
            At <span>DivyaDrishti</span>, our mission is to create a safer world for women by leveraging the power of <span>real-time analytics</span> and <span>advanced surveillance technology</span>. We are dedicated to empowering communities and law enforcement with the tools they need to prevent crimes and ensure the safety and well-being of women in public spaces.
          </div>
        </div>

        <img className="women-image" src={home} alt="DivyaDrishti Mission" />
      </div>

      <div className="circle1"></div>
      <div className="circle2"></div>
    </>
  );
}

export default Home;
