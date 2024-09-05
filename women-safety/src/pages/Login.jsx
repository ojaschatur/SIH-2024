import Navbar from "../components/Navbar.jsx";
import LoginForm from "../components/LoginForm.jsx";
import "./Login.css";

function Login() {
  return (
    <>
      <Navbar />

      <LoginForm />

      <div className="circle1"></div>
      <div className="circle2"></div>
    </>
  );
}

export default Login;
