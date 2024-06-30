import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../src/firebase/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "../src/pages/Home/Home";
import Login from "../src/pages/Login/Login";
import "./App.css";

function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Logado", user.email);
        setLogin(true);
      } else {
        setLogin(false);
      }
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("login", auth);
    signInWithPopup(auth, provider).then((result) => {
      if (result) {
        console.log("Logado", result.user.email);
        setLogin(true);
      }
    });
  };

  return (
    <div className="main">
      <BrowserRouter>
        {login ? (
          <Routes>
            <Route path="/" element={login ? <Home /> : <Navigate to="/" />} />
            {/* <Route path="/" element={<Home />} /> */}
          </Routes>
        ) : (
          <div>
            <h1>Login</h1>
            {/* <Routes>
              <Route path="/" element={<Login />} />
            </Routes> */}
            <a onClick={(e) => handleLogin(e)} href="#">
              Logar
            </a>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
