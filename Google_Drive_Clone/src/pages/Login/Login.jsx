import React from "react";

const Login = () => {
    const handleLogin = (e) => {
        e.preventDefault()
        console.log("login")
    }
  return (
    <div>
      <h1>Login page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
