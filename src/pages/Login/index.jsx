import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useDispatch } from "react-redux";
import { actions } from "../../store/login/login.slice";
import "./style.css";

function Login() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // dispatch({ type: "LOGIN", payload: user });
        dispatch(actions.login(true));
        navigate("/admin");
      })
      .catch((error) => {
        setError(true);
      });
  };
  return (
    <main className="main-admin">
      <div className="container">
        <div className="login">
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            {error && <span>Wrong email or password!</span>}
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;
