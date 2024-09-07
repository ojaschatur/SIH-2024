import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="wrapper">
      <span className="rotate-bg"></span>
      <span className="rotate-bg2"></span>

      <div className="form-box login">
        <h2 className="title animation" style={{ "--i": 0, "--j": 21 }}>
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="log-label">Registered ID:</label>

          <div className="input-box animation" style={{ "--i": 1, "--j": 22 }}>
            <input type="text" className="text" required />
          </div>

          <label className="log-label">Password:</label>

          <div className="input-box animation" style={{ "--i": 2, "--j": 23 }}>
            <input type="password" className="text" required />
          </div>

          <button
            type="submit"
            className="btn animation log-button"
            style={{ "--i": 3, "--j": 24 }}
          >
            LOGIN
          </button>
        </form>
      </div>

      <div className="info-text login">
        <h2 className="animation" style={{ "--i": 0, "--j": 20 }}>
          GET ACCESS
        </h2>
        <p className="animation" style={{ "--i": 1, "--j": 21 }}>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
